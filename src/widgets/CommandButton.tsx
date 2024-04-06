import React, { ReactNode, useContext } from 'react';
import { useRef } from 'react';
import { HandleInputType } from '../types';
import GameContext from '../GameContext';

interface CommandButtonProps {
	command: string,
	handleInput?: HandleInputType,
	className?: string,
	disabled?: boolean,
	children: ReactNode
}

export default function CommandButton({ command, handleInput, className = '', disabled = false, children }: CommandButtonProps) {
	const context = useContext(GameContext);
	const linkRef = useRef<HTMLButtonElement | null>(null);

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		if (!disabled) {
			(handleInput || context.handleInput)(linkRef.current?.getAttribute('data-command') || '');
		}
	}

	return (
		<button className={className} disabled={disabled} data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</button>
	);
}
