import React from 'react';
import { Output } from './Output';
import { CommandLink } from './CommandLink';
import { CommandForm } from './CommandForm';

export class PauseScene extends React.Component {
	render() {
		return (
			<div className="PauseScene">
				<Output {...this.props} />
				<nav>
					<ul>
						<li><CommandLink command="" text="Continue" handleCommand={this.props.handleCommand} /></li>
					</ul>
				</nav>
				<CommandForm prompt={this.props.state.prompt} />
			</div>
		);
	}
}
