import React from 'react';

export class CommandLink extends React.Component {
	handleClick(event) {
		event.preventDefault();
		this.props.handleCommand(this.props.command);
	}

	render() {
		return (
		<a className="CommandLink" href="#" onClick={(event) => this.handleClick(event)}>{this.props.text || this.props.command}</a>
		);
	}
}
