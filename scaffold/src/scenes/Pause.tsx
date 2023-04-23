import React from 'react';
import { History, Turn, CommandForm, SceneProps } from 'react-gamefic';

export default function Pause({output, history, handleInput}: SceneProps) {
	return (
		<div>
			<History turns={history} />
			<Turn output={output} />
			<CommandForm prompt={output.prompt} handleInput={handleInput} />
		</div>
	);
}