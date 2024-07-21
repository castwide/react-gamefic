import React, { useEffect, useRef, useState } from 'react';
import GameContext from './GameContext';
import { ConsoleMode, ConsolePropsType, GameContextType, HandleInputType, OutputType, SaveFileType } from './types';
import { History } from './widgets';

let started = false;

export default function Console({
	driver,
	withConsoleCommands = true,
	className = 'console',
	historySize = 1000,
	undoSize = 100,
	children
}: ConsolePropsType) {
	const [isLoading, setIsLoading] = useState(true);
	const [outputs, setOutputs] = useState<Array<OutputType>>([]);
	const [consoleMode, setConsoleMode] = useState<ConsoleMode>(ConsoleMode.Game);
	const [error, setError] = useState<Error | null>(null);

	const bottomRef = useRef<HTMLDivElement>(null);

	const uniqueKey = location.pathname.replace(/\/+/, '/');
	const snapshotKey = `snapshot-${uniqueKey}`;
	const historyKey = `history-${uniqueKey}`;
	const undoSavePointsKey = `undo-save-points-${uniqueKey}`;
	const savedPrefix = `saved-${uniqueKey}:`
	const timestampPrefix = `timestamp-${uniqueKey}:`

	const startNew = () => {
		setIsLoading(true);
		setOutputs([]);
		driver.start().catch((error) => setError(error));
	};

	useEffect(() => {
		if (!started) {
			started = true;
			driver.onUpdate((output: OutputType) => {
				setOutputs((history: OutputType[]) => [...history.slice(history.length + 1 - historySize), output]);
				setIsLoading(false);
				if (output.queue?.length > 0) {
					driver.update().catch((error) => setError(error));
				}
			});
			const snapshot = window.localStorage.getItem(snapshotKey);
			const history = JSON.parse(window.sessionStorage.getItem(historyKey) || '[]');
			if (snapshot) {
				driver.restore(snapshot).then(() => {
					setOutputs((previous: OutputType[]) => [...history.slice(history.length + 1 - historySize), previous[previous.length - 1]]);
				}).catch((error) => {
					console.log(error);
					console.log('Discarding snapshot and starting new game');
					window.localStorage.removeItem(snapshotKey);
					window.sessionStorage.removeItem(historyKey);
					startNew();
				});
			} else {
				startNew();
			}
		}
	});

	useEffect(() => {
		if (outputs.length > 0) {
			driver.snapshot().then((result: string) => {
				window.localStorage.setItem(snapshotKey, result);
				window.sessionStorage.setItem(historyKey, JSON.stringify(getHistory()));
			});
		}
	}, [outputs])

	useEffect(() => {
		if (outputs.length > 1) {
			const lastSnapshot = window.localStorage.getItem(snapshotKey);
			if (lastSnapshot && !getOutput()._metaFromConsole) {
				const undoSavePoints: string[] = JSON.parse(window.sessionStorage.getItem(undoSavePointsKey) || '[]');
				undoSavePoints.push(lastSnapshot);
				window.sessionStorage.setItem(undoSavePointsKey, JSON.stringify(undoSavePoints.slice(undoSavePoints.length + 1 -undoSize)));
			}
		}
	}, [outputs]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, [outputs]);

	const handleUndo = () => {
		window.localStorage.removeItem(snapshotKey);
		const undoSavePoints: string[] = JSON.parse(window.sessionStorage.getItem(undoSavePointsKey) || '[]');
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
			setOutputs((previous: OutputType[]) => [...previous, output]);
		} else {
			const snapshot = undoSavePoints.pop();
			window.sessionStorage.setItem(undoSavePointsKey, JSON.stringify(undoSavePoints));
			driver.restore(snapshot).then((restored) => {
				const output: OutputType = Object.assign(
					restored,
					{
						last_prompt: '>',
						last_input: 'undo',
						messages: `<p><code>Previous turn undone.</code></p>`,
						_metaFromConsole: true
					}
				);
				setOutputs((previous: OutputType[]) => [...previous.slice(0, previous.length - 1), output]);
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
		} else if (withConsoleCommands && command?.toLowerCase() == 'undo') {
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
		window.localStorage.removeItem(snapshotKey);
		window.sessionStorage.removeItem(historyKey);
		window.sessionStorage.removeItem(undoSavePointsKey);
		startNew();
	}

	const handleSave = (name: string) => {
		const trimmed = name.trim();
		driver.snapshot().then((result: string) => {
			window.localStorage.setItem(`${savedPrefix}${trimmed}`, result);
			window.localStorage.setItem(`${timestampPrefix}${trimmed}`, Date.now().toString())
		});
	}

	const handleRestore = (name: string) => {
		const snapshot = window.localStorage.getItem(`${savedPrefix}${name}`);
		if (snapshot) {
			setOutputs([]);
			driver.restore(snapshot);
		} else {
			alert(`Save file '${name}' does not exist.`);
		}
	}

	const handleDelete = (name: string) => {
		window.localStorage.removeItem(`${savedPrefix}${name}`)
	}

	const handleGetSavedFiles = () => {
		const files = [];
		for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i)
			if (key?.startsWith(savedPrefix)) {
				const name = key.substring(savedPrefix.length);
				const date = window.localStorage.getItem(`${timestampPrefix}${name}`);
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
		console.error("An error occurred in the game driver:", error);
		return (
			<div className={className}>
				<History turns={getHistory()} />
				<div>
					<p>
						An error occurred in the game driver: <code>{error.message}</code>
					</p>
				</div>
				<div>Stack:</div>
				<pre>{error.stack}</pre>
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
