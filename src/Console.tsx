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
	className = 'Console',
	children
}: ConsoleProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [outputs, setOutputs] = useState<Array<any>>([]);
	const [error, setError] = useState<String | null>(null);

	const bottomRef = useRef<HTMLDivElement>(null);

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
			if (snapshot) {
				driver.restore(snapshot);
			} else {
				driver.start().then(() => {}).catch((error) => {
					setError(error.toString());
				});
			}
		}
	});

	useEffect(() => {
		if (outputs.length > 1) {
			driver.snapshot().then((result) => {
				window.localStorage.setItem('snapshot', result);
			});
		}
	}, [driver, outputs]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, [outputs]);

	const handleInput = (input: string) => {
		driver.receive(input).then((response: any) => {
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
		setOutputs([]);
		driver.start();
	}

	const handleSave = () => {
		driver.snapshot().then((result) => {
			window.localStorage.setItem('saved', result);
		});
	}

	const handleRestore = () => {
		const snapshot = window.localStorage.getItem('saved');
		if (snapshot) {
			setOutputs([]);
			driver.restore(snapshot);
		} else {
			alert('No saved game.');
		}
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
			handleInput: handleInput,
			handleNew: handleNew,
			handleRestore: handleRestore,
			handleSave: handleSave
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
