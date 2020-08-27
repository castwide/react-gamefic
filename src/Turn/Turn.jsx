import React from 'react';

export class Turn extends React.Component {
	nodeIsCommandWidget(node) {
		if (node.nodeName.toLowerCase() == 'a' && node.classList.contains('gamefic-command')) {
			return true;
		}
		if (node.nodeName.toLowerCase() == 'button' && node.classList.contains('gamefic-command')) {
			return true;
		}
		return false;
	}

	findCommandWidget(node) {
		while (!this.nodeIsCommandWidget(node)) {
			if (!node.parentNode) return false;
			node = node.parentNode;
		}
		return node;
	}

	handleClickCapture(event) {
		var a = this.findCommandWidget(event.target);
		if (a) {
			event.stopPropagation();
			event.preventDefault();
			if (this.props.time == 'Present') {
				this.props.handleCommand(a.getAttribute('data-command'));
			}
		}
	}

	render() {
		var kbd;
		if (this.props.state.last_prompt || this.props.state.last_input) {
			kbd = <p><kbd>{this.props.state.last_prompt} {this.props.state.last_input}</kbd></p>;
		}
		return (
			<div className={'Turn ' + this.props.time} onClickCapture={(event) => this.handleClickCapture(event)}>
				{kbd}
				<div dangerouslySetInnerHTML={{ __html: this.props.state.messages }}></div>
			</div>
		);
	}
}

Turn.defaultProps = {
	time: 'Past'
}
