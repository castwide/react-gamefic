import React from 'react';
import { Output } from './Output';
import { CommandLink } from './CommandLink';

export class PauseScene extends React.Component {
	renderChildren() {
		return (
			<>
				<Output {...this.props} transcribe={true} />
				<CommandLink command="">Continue</CommandLink>
			</>
		);
	}

	render() {
		return (
			<div className="PauseScene">
				{ this.props.children || this.renderChildren() }
			</div>
		);
	}
}
