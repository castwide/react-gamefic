import React from 'react';
import {Output} from '../Output';
import {CommandForm} from '../CommandForm';

export class ActiveScene extends React.Component {
	render() {
		return (
			<div className="ActiveScene">
				<Output {...this.props} />
				<CommandForm {...this.props} />
			</div>
		);
	}
}
