import React from 'react';
import { Turn } from '.';
import { OutputType } from '../types';

interface HistoryProps {
	turns: OutputType[],
	className?: string
}

export default function History({turns, className}: HistoryProps) {
	const renderHistory = () => {
		const renderTurns = turns.map((turn: OutputType, index: number) => {
			return (
				<Turn key={index} output={turn} />
			);
		});
	
		return (
			<div>
				{renderTurns}
			</div>
		)
	}

	return (turns?.length > 0 ? 
		<div className={className}>
			{renderHistory()}
		</div>
		: null
	);
}
