import React from 'react';
import {History} from '../History';
import {Turn} from '../Turn';
import {StateImage} from '../StateImage';

export class Output extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	  return (
			<div className="Output">
				<StateImage {...this.props} />
				<History {...this.props} />
				<Turn state={this.props.state} handleCommand={this.props.handleCommand} time="Present" />
			</div>
	  )
	}
}
