import React from 'react';
import {Turn} from '../Turn';

export class Output extends React.Component {
	constructor(props) {
		super(props);
	}

	renderHistory() {
		return this.props.history.map((opt, index) => {
		  return (
				<Turn time="Past" state={opt} />
		  );
		});
	}

	render() {
		var history;
		if (this.props.showHistory) {
			history = <div>{this.renderHistory()}</div>
		}
	  return (
			<div className="Output">
				{history}
				<Turn state={this.props.state} time="Present" />
			</div>
	  )
	}
}
