import React from 'react';
import { Output } from './Output';
import { CommandForm } from './CommandForm';

export class ActivityScene extends React.Component {
	render() {
		return (
			<div className="ActivityScene">
				<Output {...this.props} />
				<CommandForm prompt={this.props.state ? this.props.state.prompt : ''} />
			</div>
		);
	}
}
