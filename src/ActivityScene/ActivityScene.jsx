import React from 'react';
import {Output} from '../Output';
import {CommandForm} from '../CommandForm';

export class ActivityScene extends React.Component {
	render() {
		return (
			<div className="ActivityScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<CommandForm {...this.props} />
			</div>
		);
	}
}
