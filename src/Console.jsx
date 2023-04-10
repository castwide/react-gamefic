import React from 'react';
import PropTypes from 'prop-types';

export class Console extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			output: {},
			history: []
		};
		this.history = [];
		this.props.driver.onUpdate(this.handleUpdate.bind(this));
	}

	handleUpdate(output) {
		Object.keys(this.state.output).forEach((k) => {
			output[k] = output[k] || null;
		});
		this.setState({
			output: output,
			history: [...this.history]
		});
		this.history.push(output);
	}

	handleCommand(input) {
		this.props.driver.receive(input);
	}

	nodeIsCommandWidget(node) {
		return node.nodeName.match(/^(a|button)$/i) && node.hasAttribute('data-command');
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
			event.preventDefault();
			event.stopPropagation();
			if (!a.classList.contains('disabled')) {
				this.handleCommand(a.getAttribute('data-command'));
			}
		}
	}

	handleSubmitCapture(event) {
		if (event.target.hasAttribute('data-command')) {
			event.preventDefault();
			event.stopPropagation();
			this.handleCommand(event.target.getAttribute('data-command'));
		}
	}

	render() {
		var propKids = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, Object.assign({}, this.state, { handleCommand: this.handleCommand.bind(this) }));
		});
		return (
			<div className="Console" onClickCapture={(event) => this.handleClickCapture(event)} onSubmitCapture={(event) => this.handleSubmitCapture(event)}>
				{propKids}
			</div>
		);
	}
}

Console.propTypes = {
	driver: PropTypes.object.isRequired
}
