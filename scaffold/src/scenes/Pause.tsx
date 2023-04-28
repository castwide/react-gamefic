import React from 'react';
import { History, Turn, CommandForm, ScenePropsType } from 'react-gamefic';

export default function Pause({output, history, handleInput}: ScenePropsType) {
	return (
		<div>
			<History turns={history} />
			<Turn output={output} />
			<CommandForm prompt={output.prompt} handleInput={handleInput} />
		</div>
	);
}
