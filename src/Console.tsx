import React, { ReactFragment } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Driver } from 'gamefic-driver';
// import type SceneProps from './SceneProps';
import GameContext from './GameContext';

let started = false;

interface ConsoleProps {
	driver: Driver,
	className?: string,
	children: ReactFragment
}

export default function Console({
	driver,
	className = 'console',
	children
}: ConsoleProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [outputs, setOutputs] = useState<Array<any>>([]);
	const [error, setError] = useState<string | null>(null);

	const bottomRef = useRef<HTMLDivElement>(null);

	const startNew = () => {
		setIsLoading(true);
		setOutputs([]);
		driver.start().then(() => {
		}).catch((error) => {
			setError(error.toString());
		});
	};

	useEffect(() => {
		if (!started) {
			started = true;
			driver.onUpdate((output: any) => {
				setOutputs(history => [...history, output]);
				setIsLoading(false);
				if (output.queue?.length > 0) {
					driver.update();
				}
			});
			const snapshot = window.localStorage.getItem('snapshot');
			const history = JSON.parse(window.sessionStorage.getItem('history') || '[]');
			if (snapshot) {
				driver.restore(snapshot).then(() => {
					setOutputs(previous => [...history, previous[previous.length - 1]]);
				}).catch((error) => {
					console.log(error);
					console.log('Ignoring snapshot and starting new game');
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
				driver.snapshot().then((result) => {
					window.localStorage.setItem('snapshot', result);
					window.sessionStorage.setItem('history', JSON.stringify(getHistory()));
				});
			}
		}
	}, [driver, outputs]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, [outputs]);

	const concluded = () => {
		return getOutput().scene.type == 'Conclusion';
	}

	const handleInput = (input: string) => {
		driver.receive(input).then(() => {
			driver.update();
		});
	};

	const getOutput = (): any => {
		return outputs[outputs.length - 1] || {};
	};

	const getHistory = (): Array<any> => {
		return outputs.slice(0, -1) || [];
	}

	const handleNew = () => {
		window.localStorage.removeItem('snapshot');
		window.sessionStorage.removeItem('history');
		startNew();
	}

	const handleSave = (name: string) => {
		const trimmed = name.trim();
		driver.snapshot().then((result) => {
			window.localStorage.setItem(`saved:${trimmed}`, result);
			window.localStorage.setItem(`timestamp:${trimmed}`, Date.now())
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

	const getSavedFiles = () => {
		const files = [];
		for (var i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i)
			if (key?.startsWith('saved:')) {
				const name = key.substring(6);
				const date = window.localStorage.getItem(`timestamp:${name}`);
				files.push({
					name: name,
					date: date ? (new Date(Number.parseInt(date)).toLocaleString()) : null,
					timestamp: date
				});
			}
		}
		files.sort((a, b) => b.timestamp - a.timestamp);
		return files;
	}

	if (error) {
		return (
			<div className={className}>{error}</div>
		)
		} else if (isLoading) {
		return (
			<div className={className}>loading</div>
		);
	} else {
		const context = {
			output: getOutput(),
			history: getHistory(),
			handleInput,
			handleNew,
			handleRestore,
			handleSave,
			handleDelete,
			getSavedFiles
		}

		return (
			<GameContext.Provider value={context}>
				<div className={className}>
					{children}
					<div ref={bottomRef} />
				</div>
			</GameContext.Provider>
		)
	}
}
