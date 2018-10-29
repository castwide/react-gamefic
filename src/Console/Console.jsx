import React from 'react';
import PropTypes from 'prop-types';

export class Console extends React.Component {
	constructor(props) {
		super(props);
		this.props.driver.onUpdate(this.handleUpdate.bind(this));
	}
	  
	componentDidMount() {
		this.props.driver.start();
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
		this.setState(newState);
	}

	handleCommand(input) {
		this.props.driver.receive(input);
	}

	render() {
		return (
			<div className="Console">
				{this.props.children}
			</div>
		)
	}
}

Console.propTypes = {
	driver: PropTypes.object.isRequired,
	consoleDidUpdate: PropTypes.func
}
