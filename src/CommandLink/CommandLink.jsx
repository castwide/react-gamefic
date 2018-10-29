import React from 'react';

export class CommandLink extends React.Component {
	handleClickCapture(event) {
		event.preventDefault();
		if (this.props.disabled) {
			event.stopPropagation();
		}
	}

	render() {
		return (
			<a className="CommandLink" onClickCapture={(event) => this.handleClickCapture(event)} data-command={this.props.command}>{this.props.text || this.props.command}</a>
		);
	}
}

CommandLink.defaultProps = {
	disabled: false
}
