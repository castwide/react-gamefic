import React, { ReactNode, useContext } from 'react';
import { useRef } from 'react';
import { HandleInputType } from '../types';
import GameContext from '../GameContext';

interface CommandLinkProps {
	command: string,
	handleInput?: HandleInputType,
	children: ReactNode,
	className?: string
}

export default function CommandLink({command, handleInput, className = '', children}: CommandLinkProps) {
	const context = useContext(GameContext);
	const linkRef = useRef<HTMLAnchorElement | null>(null);

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		(handleInput || context.handleInput)(linkRef.current?.getAttribute('data-command') || '');
	}

	return (
		<a className={className} href="#" data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</a>
	);
}
