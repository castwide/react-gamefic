import React from 'react';
import { useRef } from 'react';

interface CommandFormProps {
	prompt: string,
	handleInput: Function,
	className: string
}

export default function CommandForm({prompt, handleInput, className= ''}: CommandFormProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		handleInput(inputRef.current?.value);
		// @ts-ignore
		inputRef.current.value = '';
	}

	return (
		<form className={className} onSubmit={handleSubmit}>
			<label>{prompt}</label>
			<input role="input" type="text" ref={inputRef} />
			<button type="submit">Enter</button>
		</form>
	);
}
