import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';

export class PauseScene extends React.Component {
	render() {
		return (
			<div className="PauseScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<p>
					<CommandLink command="" text="Continue..." handleCommand={this.props.handleCommand} />
					<CommandForm {...this.props} />
				</p>
			</div>
		);
	}
}