import React from 'react';
import { History, Turn, OptionList, CommandForm, SceneProps } from 'react-gamefic';

export default function Activity({output, history, handleInput}: SceneProps) {
	return (
		<div>
			<History turns={history} />
			<Turn output={output} handleInput={handleInput} />
			<OptionList options={output.options} handleInput={handleInput} />
			<CommandForm prompt={output.prompt} handleInput={handleInput} />
		</div>
	);
}
