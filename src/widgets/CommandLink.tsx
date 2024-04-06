import React from 'react';
import CommandButton from './CommandButton';
import { CommandButtonProps } from '../types';
import styles from './CommandLink.module.css';

export default function CommandLink({ command, handleInput, className = '', disabled = false, children }: CommandButtonProps) {
	return (
		<CommandButton className={`${styles.commandLink} ${className}`} disabled={disabled} command={command} handleInput={handleInput}>{children || command}</CommandButton>
	);
}
