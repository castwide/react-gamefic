import React from 'react';
import {Turn} from '../Turn';

export class History extends React.Component {
	renderTurns() {
		return this.props.history.map((opt, index) => {
		  return (
			<Turn key={index} time="Past" state={opt} />
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
