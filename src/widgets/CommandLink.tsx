import React from 'react';
import CommandButton from './CommandButton';
import { CommandButtonProps } from '../types';
import './CommandLink.css';

export default function CommandLink({ command, handleInput, className = '', disabled = false, children }: CommandButtonProps) {
	return (
		<CommandButton className={`__react_gamefic_commandlink ${className}`} disabled={disabled} command={command} handleInput={handleInput}>{children || command}</CommandButton>
	);
}
