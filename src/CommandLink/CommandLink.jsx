import React from 'react';
import PropTypes from 'prop-types';

export class CommandLink extends React.Component {
	handleClickCapture(event) {
		event.preventDefault();
		if (this.props.disabled) {
			event.stopPropagation();
		}
	}

	render() {
		return (
			<a onClickCapture={(event) => this.handleClickCapture(event)} data-command={this.props.command}>{this.props.text || this.props.command}</a>
		);
	}
}

CommandLink.defaultProps = {
	disabled: false
}