import React from 'react';
import HtmlText from './HtmlText';

interface TurnProps {
	output: { [key: string]: any },
	handleInput?: (command: string) => void,
	className?: string
}

export default function Turn({output, handleInput, className}: TurnProps) {
	const lastInput = output.last_input ? (
		<p>
			<kbd>{output.last_prompt} {output.last_input}</kbd>
		</p>
	) : (
		null
	);

	return (
		<div className={className}>
			{lastInput}
			<HtmlText text={output.messages} handleInput={handleInput} />
		</div>
	)
}
