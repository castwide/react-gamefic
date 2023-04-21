import React from 'react';
import { Turn } from '.';

export default function History({turns, className = ''}: any) {
	const renderHistory = () => {
		const renderTurns = turns.map((turn: any, index: any) => {
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
