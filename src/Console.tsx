import React, { useEffect, useRef, useState } from 'react';
import GameContext from './GameContext';
import Modals from './widgets/Modals';
import { ConsoleMode, ConsolePropsType, GameContextType, HandleInputType, OutputType, SaveFileType } from './types';
import { History } from './widgets';

let started = false;

export default function Console({
	driver,
	withConsoleCommands = true,
	className = 'console',
	children
}: ConsolePropsType) {
	const [isLoading, setIsLoading] = useState(true);
	const [outputs, setOutputs] = useState<Array<OutputType>>([]);
	const [consoleMode, setConsoleMode] = useState<ConsoleMode>(ConsoleMode.Game);
	const [error, setError] = useState<Error | null>(null);

	const bottomRef = useRef<HTMLDivElement>(null);

	const startNew = () => {
		setIsLoading(true);
		setOutputs([]);
		driver.start().catch((error) => setError(error));
	};

	useEffect(() => {
		if (!started) {
			started = true;
			driver.onUpdate((output: OutputType) => {
				setOutputs(history => [...history, output]);
				setIsLoading(false);
				if (output.queue?.length > 0) {
					driver.update().catch((error) => setError(error));
				}
			});
			const snapshot = window.localStorage.getItem('snapshot');
			const history = JSON.parse(window.sessionStorage.getItem('history') || '[]');
			if (snapshot) {
				driver.restore(snapshot).then(() => {
					setOutputs(previous => [...history, previous[previous.length - 1]]);
				}).catch((error) => {
					console.log(error);
					console.log('Discarding snapshot and starting new game');
					window.localStorage.removeItem('snapshot');
					window.sessionStorage.removeItem('history');
					startNew();
				});
			} else {
				startNew();
			}
		}
	});

	useEffect(() => {
		if (outputs.length > 1) {
			if (concluded()) {
				window.localStorage.removeItem('snapshot');
				window.sessionStorage.removeItem('history');
			} else {
				const lastSnapshot = window.localStorage.getItem('snapshot');
				if (lastSnapshot && !getOutput()._metaFromConsole) {
					console.log(`Snapshot size: ${lastSnapshot.length} bytes`);
					const undoSavePoints: string[] = JSON.parse(window.sessionStorage.getItem('undo_save_points') || '[]');
					undoSavePoints.push(lastSnapshot);
					window.sessionStorage.setItem('undo_save_points', JSON.stringify(undoSavePoints));
				}
				driver.snapshot().then((result) => {
					window.localStorage.setItem('snapshot', result);
					window.sessionStorage.setItem('history', JSON.stringify(getHistory()));
				});
			}
		}
	}, [outputs]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, [outputs]);

	const concluded = () => {
		return getOutput().scene.type == 'Conclusion';
	}

	const handleUndo = () => {
		window.localStorage.removeItem('snapshot');
		const undoSavePoints: string[] = JSON.parse(window.sessionStorage.getItem('undo_save_points') || '[]');
		if (undoSavePoints.length == 0) {
			const output: OutputType = Object.assign(
				JSON.parse(JSON.stringify(getOutput())),
				{
					last_prompt: '>',
					last_input: 'undo',
					messages: '<p><code>Undo is not available here.</code></p>',
					_metaFromConsole: true
				}					
			)
			setOutputs(previous => [...previous, output]);
		} else {
			const snapshot = undoSavePoints.pop();
			const history = getHistory();
			const last = history[history.length - 1];
			const output: OutputType = Object.assign(
				JSON.parse(JSON.stringify(last)),
				{
					last_prompt: '>',
					last_input: 'undo',
					messages: `<p><code>Previous turn undone.</code></p>`,
					_metaFromConsole: true
				}
			)
			window.sessionStorage.setItem('undo_save_points', JSON.stringify(undoSavePoints));
			driver.restore(snapshot).then(() => {
				setOutputs(previous => [...previous.slice(0, previous.length - 1), output]);
			});
		}
	}

	const handleInput: HandleInputType = (command: string | null) => {
		if (withConsoleCommands && command?.toLowerCase() == 'save') {
			setConsoleMode(ConsoleMode.Save);
		} else if (withConsoleCommands && command?.toLowerCase() == 'restore') {
			setConsoleMode(ConsoleMode.Restore);
		} else if (command?.toLowerCase() == 'restart') {
			if (confirm('Discard unsaved changes and start a new game?')) {
				handleNew();
			}
		} else if (withConsoleCommands && command == 'undo') {
			handleUndo();
		} else {
			driver.receive(command || '').then(() => {
				driver.update().catch((error) => setError(error));
			});
		}
	};

	const getOutput = (): OutputType => {
		return outputs[outputs.length - 1] || {};
	};

	const getHistory = (): Array<OutputType> => {
		return outputs.slice(0, -1) || [];
	}

	const handleNew = () => {
		window.localStorage.removeItem('snapshot');
		window.sessionStorage.removeItem('history');
		window.sessionStorage.removeItem('undo_save_points');
		startNew();
	}

	const handleSave = (name: string) => {
		const trimmed = name.trim();
		driver.snapshot().then((result) => {
			window.localStorage.setItem(`saved:${trimmed}`, result);
			window.localStorage.setItem(`timestamp:${trimmed}`, Date.now().toString())
		});
	}

	const handleRestore = (name: string) => {
		const snapshot = window.localStorage.getItem(`saved:${name}`);
		if (snapshot) {
			setOutputs([]);
			driver.restore(snapshot);
		} else {
			alert(`Save file '${name}' does not exist.`);
		}
	}

	const handleDelete = (name: string) => {
		window.localStorage.removeItem(`saved:${name}`)
	}

	const handleGetSavedFiles = () => {
		const files = [];
		for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i)
			if (key?.startsWith('saved:')) {
				const name = key.substring(6);
				const date = window.localStorage.getItem(`timestamp:${name}`);
				const file: SaveFileType = {
					name: name,
					date: date ? (new Date(Number.parseInt(date)).toLocaleString()) : 'n/a',
					timestamp: date ? Number.parseInt(date) : 0
				}
				files.push(file);
			}
		}
		files.sort((a, b) => b.timestamp - a.timestamp);
		return files;
	}

	if (error) {
		return (
			<div className={className}>
				<History turns={getHistory()} />
				<div>{error.message}</div>
				<div>{error.name}</div>
				<div>{error.stack}</div>
			</div>
		)
	} else if (isLoading) {
		return (
			<div className={className}>loading</div>
		);
	} else {
		const context: GameContextType = {
			consoleMode,
			output: getOutput(),
			history: getHistory(),
			setConsoleMode,
			handleInput,
			handleNew,
			handleRestore,
			handleSave,
			handleDelete,
			handleGetSavedFiles,
			handleUndo
		}

		return (
			<GameContext.Provider value={context}>
				<div className={className}>
					{children}
					<div ref={bottomRef} data-scene-name={context.output?.scene.name} data-scene-type={context.output?.scene.type} />
				</div>
			</GameContext.Provider>
		)
	}
}
