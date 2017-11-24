import React from 'react';
import {ActiveScene} from '../ActiveScene';
import {MultipleChoiceScene} from '../MultipleChoiceScene';
import {PauseScene} from '../PauseScene';
import {YesOrNoScene} from '../YesOrNoScene';
import PropTypes from 'prop-types';

export class Console extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.history = [];
		this.lastCommand = null;
		this.props.driver.start().then((response) => {
			this.setState(response);
		});
	}
  
	componentDidUpdate() {
		this.history.push(Object.assign({}, this.state));
	}

	handleCommand(input) {
		this.props.driver.receive(input).then((newState) => {
			Object.keys(this.state).forEach((k) => {
				newState[k] = newState[k] || null;
			});
			newState.lastCommand = input;
			this.setState(newState);
		});
	}
  
	render () {
		var props = {
			state: this.state,
			history: this.history,
			showHistory: this.props.showHistory,
			handleCommand: this.handleCommand.bind(this)
		}
		if (this.state.scene == 'MultipleChoice') {
			return (
				<div className="Console">
					<MultipleChoiceScene {...props} />
				</div>
			);
	  	} else if (this.state.scene == 'Pause') {
			return (
				<div className="Console">
					<PauseScene {...props} />
				</div>
			);
	  	} else if (this.state.scene == 'YesOrNo') {
			return (
				<div className="Console">
					<YesOrNoScene {...props} />
				</div>
			);
	  	} else {
			return (
				<div className="Console">
					<ActiveScene {...props} />
				</div>
			);
	  	}
	}
}

Console.defaultProps = {
	showHistory: true
};

Console.propTypes = {
	driver: PropTypes.object.isRequired
}
