import React from 'react';
import { Turn } from '.';

interface HistoryProps {
	turns: [],
	className?: string
}

export default function History({turns, className}: HistoryProps) {
	const renderHistory = () => {
		const renderTurns = turns.map((turn: any, index: number) => {
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
