import React from 'react';
import {ActivityScene} from '../ActivityScene';
import {MultipleChoiceScene} from '../MultipleChoiceScene';
import {PauseScene} from '../PauseScene';
import {YesOrNoScene} from '../YesOrNoScene';
import {Output} from '../Output';
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
		console.log('Yep, we usin the linked one! And the scene is ' + this.state.scene + '...' + this.props.sceneComponents[this.state.scene]);
		var props = {
			state: this.state,
			history: this.history,
			handleCommand: this.handleCommand.bind(this),
			stateImageKey: this.props.stateImageKey
		}
		if (this.state.scene) {
			return React.createElement(this.props.sceneComponents[this.state.scene], props, null);
		} else {
			// TODO: Should this return some kind of noop scene?
			return (
			<ActivityScene {...props} />
			);
		}
	}
}

Console.defaultProps = {
	sceneComponents: {
		Activity: ActivityScene,
		Pause: PauseScene,
		MultipleChoice: MultipleChoiceScene,
		YesOrNo: YesOrNoScene
	},
	outputComponent: Output,
	stateImageKey: null
};

Console.propTypes = {
	driver: PropTypes.object.isRequired
}
