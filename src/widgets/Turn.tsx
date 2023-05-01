import React from 'react';
import HtmlText from './HtmlText';
import OptionList from './OptionList';
import { HandleInputType, OutputType } from '../types';

interface TurnProps {
	output?: OutputType,
	handleInput?: HandleInputType,
	className?: string
}

export default function Turn({output, handleInput, className}: TurnProps) {
	const lastInput = (output?.last_prompt || output?.last_input) ? (
		<p>
			<kbd>{output?.last_prompt} {output?.last_input}</kbd>
		</p>
	) : (
		null
	);

	return (
		<div className={className}>
			{lastInput}
			<HtmlText text={output?.messages || ''} handleInput={handleInput} />
			<OptionList options={output?.options || []} handleInput={handleInput} />
		</div>
	)
}
