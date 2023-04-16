import React from 'react';
import HtmlText from './HtmlText';

export default function Turn({output, handleInput}: any) {
	const lastInput = output.last_input ? (
		<p>
			<kbd>{output.last_prompt} {output.last_input}</kbd>
		</p>
	) : (
		null
	);

	return (
		<div>
			{lastInput}
			<HtmlText text={output.messages} handleInput={handleInput} />
		</div>
	)
}
