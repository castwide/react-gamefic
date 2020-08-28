import React from 'react';
import PropTypes from 'prop-types';

export class Console extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			state: {},
			history: []
		};
		this.history = [];
		this.props.driver.onUpdate(this.handleUpdate.bind(this));
	}

	componentDidUpdate() {
		if (this.props.consoleDidUpdate) {
			this.props.consoleDidUpdate();
		}
	}

	handleUpdate(newState) {
		Object.keys(this.state).forEach((k) => {
			newState[k] = newState[k] || null;
		});
		this.setState({
			state: newState,
			history: this.history
		});
		this.history.push(newState);
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
	driver: PropTypes.object.isRequired,
	consoleDidUpdate: PropTypes.func
}
