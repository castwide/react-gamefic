import React from 'react';
import { useRef } from 'react';

export default function CommandLink({command, handleInput, children}: any) {
	const linkRef = useRef(null);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// @ts-ignore
		handleInput(linkRef.current.getAttribute('data-command'));
	}

	return (
		<a href="#" data-command={command} ref={linkRef} onClick={handleSubmit}>{children || command}</a>
	);
};
