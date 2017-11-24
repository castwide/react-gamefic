import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';

export class PauseScene extends React.Component {
	render() {
		return (
			<div className="PauseScene">
				<Output {...this.props} />
				<p>
					<CommandLink command="" text="Continue..." handleCommand={this.props.handleCommand} />
				</p>
			</div>
		);
	}
}