import React from 'react';
import { useEffect, useRef } from 'react';
import { HandleInputType } from '../types';

interface CommandFormProps {
	prompt: string,
	handleInput: HandleInputType,
	className?: string
}

export default function CommandForm({prompt, handleInput, className= ''}: CommandFormProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleInput(inputRef.current?.value || '');
		if (inputRef.current) inputRef.current.value = '';
	}

	return (
		<form className={className} onSubmit={handleSubmit}>
			<label>{prompt}</label>
			<input role="input" type="text" ref={inputRef} />
			<button type="submit">Enter</button>
		</form>
	);
}
