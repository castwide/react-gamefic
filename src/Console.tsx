import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Driver } from 'gamefic-driver';
import type SceneProps from './SceneProps';

type SceneMapType = { [key: string]: React.FunctionComponent<SceneProps> }

let started = false;

interface ConsoleProps {
	driver: Driver,
	namedScenes?: SceneMapType,
	typedScenes?: SceneMapType,
	className?: string,
}

export default function Console({
	driver,
	namedScenes = {},
	typedScenes = {},
	className = 'Console'
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
			driver.start().then(() => {}).catch((error) => {
				setError(error.toString());
			});
		}
	});

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

	const selectScene = () => {
		const output = getOutput();
		const name = output.scene?.name;
		const type = output.scene?.type || output.scene;
		const available = namedScenes[name] || typedScenes[type];
		if (available) {
			return available;
		} else {
			throw(`Scene name "${name}" and type "${type}" are not assigned to a component`);
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
		const selected = selectScene();
		return (
			<div className={className}>
				{ /* @ts-ignore */}
				{React.createElement(selected, {output: getOutput(), history: getHistory(), handleInput: handleInput}, null)}
				<div ref={bottomRef} />
			</div>
		)
	}
}
