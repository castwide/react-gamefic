import React from 'react';
import { Turn } from '../Turn';

export class History extends React.Component {
	renderTurns() {
		return this.props.history.map((opt, index) => {
			return (
				<Turn key={index} time={index < this.props.history.length ? 'Past' : 'Present'} handleCommand={this.props.handleCommand} state={opt} />
			);
		});
	}

	render() {
		return (
			<div className="History">
				{this.renderTurns()}
			</div>
		);
	}
}
