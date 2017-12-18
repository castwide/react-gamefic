import React from 'react';

export class CommandLink extends React.Component {
	render() {
		return (
		<a className="CommandLink gamefic-command" href="#" data-command={this.props.command}>{this.props.text || this.props.command}</a>
		);
	}
}
