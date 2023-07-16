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

export default function CommandLink({command, handleInput, className = '', disabled = false, children}: CommandLinkProps) {
	const context = useContext(GameContext);
	const linkRef = useRef<HTMLAnchorElement | null>(null);

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		if (!disabled) {
			(handleInput || context.handleInput)(linkRef.current?.getAttribute('data-command') || '');
		}
	}

	return (
		<a className={`${className}${disabled ? ' disabled' : ''}`} href="#" data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</a>
	);
}
