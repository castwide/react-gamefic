import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';
import {CommandForm} from '../CommandForm';

export class PauseScene extends React.Component {
	render() {
		return (
			<div className="PauseScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<ul>
					<li><CommandLink command="" text="Continue" handleCommand={this.props.handleCommand} /></li>
				</ul>
				<CommandForm {...this.props} />
			</div>
		);
	}
}
