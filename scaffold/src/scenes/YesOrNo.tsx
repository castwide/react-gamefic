import React from 'react';
import { History, Turn, CommandForm, SceneProps } from 'react-gamefic';

export default function YesOrNo({output, history, handleInput}: SceneProps) {
	return (
		<div>
			<History turns={history} />
			<Turn output={output} handleInput={handleInput} />
			<CommandForm prompt={output.prompt} handleInput={handleInput} />
		</div>
	);
}
