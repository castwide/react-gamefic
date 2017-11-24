import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';

export class YesOrNoScene extends React.Component {
	render() {
		return (
			<div className="YesOrNoScene">
				<Output {...this.props} />
				<CommandLink command="Yes" handleCommand={this.props.handleCommand} />
				<CommandLink command="No" handleCommand={this.props.handleCommand} />
			</div>
		);
	}
}
