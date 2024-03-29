import React, { ReactNode, useContext } from 'react';
import { useRef } from 'react';
import { HandleInputType } from '../types';
import GameContext from '../GameContext';

interface CommandLinkProps {
	command: string,
	handleInput?: HandleInputType,
	className?: string,
	disabled?: boolean,
	children: ReactNode
}

const linkStyle = {
	display: 'inline',
	border: 'none',
	margin: 0,
	padding: 0,
	textDecoration: 'underline',
	backgroundColor: 'transparent',
	color: '#0000FF',
	cursor: 'pointer'
}

export default function CommandLink({ command, handleInput, className = '', disabled = false, children }: CommandLinkProps) {
	const context = useContext(GameContext);
	const linkRef = useRef<HTMLButtonElement | null>(null);

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		if (!disabled) {
			(handleInput || context.handleInput)(linkRef.current?.getAttribute('data-command') || '');
		}
	}

	return (
		<button style={linkStyle} className={`${className} ${disabled ? ' disabled' : ''}`} disabled={disabled} data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</button>
	);
}
