import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';
import {CommandForm} from '../CommandForm';

export class YesOrNoScene extends React.Component {
	render() {
		return (
			<div className="YesOrNoScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<CommandLink command="Yes" handleCommand={this.props.handleCommand} />
				<CommandLink command="No" handleCommand={this.props.handleCommand} />
				<CommandForm {...this.props} />
			</div>
		);
	}
}
