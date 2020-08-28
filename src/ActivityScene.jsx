import React from 'react';
import { Output } from './Output';
import { CommandForm } from './CommandForm';

export class ActivityScene extends React.Component {
	renderChildren() {
		return (
			<>
				<Output {...this.props} />
				<CommandForm prompt={this.props.state ? this.props.state.prompt : ''} />
			</>
		);
	}

	render() {
		return (
			<div className="ActivityScene">
				{ this.props.children || this.renderChildren() }
			</div>
		);
	}
}
