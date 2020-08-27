import React from 'react';

export class CommandLink extends React.Component {
	render() {
		return (
			<a className={'CommandLink' + (this.props.disabled ? ' disabled' : '')} href="#" data-command={this.props.command}>{this.props.children || this.props.command}</a>
		);
	}
}

CommandLink.defaultProps = {
	disabled: false
}
