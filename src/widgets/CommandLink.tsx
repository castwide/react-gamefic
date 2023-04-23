import React, { ReactFragment } from 'react';
import { useRef } from 'react';

interface CommandLinkProps {
	command: string,
	handleInput: (command: string) => void,
	children: ReactFragment,
	className?: string
}

export default function CommandLink({command, handleInput, className = '', children}: CommandLinkProps) {
	const linkRef = useRef(null);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// @ts-ignore
		handleInput(linkRef.current.getAttribute('data-command'));
	}

	return (
		<a className={className} href="#" data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</a>
	);
}
