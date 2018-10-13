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
		this.lastPrompt = null;
		this.props.driver.onUpdate(this.handleUpdate.bind(this));
	}
	  
	componentDidMount() {
		this.props.driver.start();
	}

	componentDidUpdate() {
		this.history.push(Object.assign({}, this.state));
		if (this.props.autoScroll) {
			this.bottomElement.scrollIntoView({ behavior: 'smooth'});
		}
		if (this.props.consoleDidUpdate) {
			this.props.consoleDidUpdate();
		}
	}

	handleUpdate(newState) {
		this.lastPrompt = this.state.prompt;
		this.containerElement.className = 'Console working';
		Object.keys(this.state).forEach((k) => {
			newState[k] = newState[k] || null;
		});
		this.containerElement.className = 'Console';
		this.setState(newState);
	}

	handleCommand(input) {
		this.containerElement.className = 'Console working';
		this.props.driver.receive(input);
	}

	render () {
		var props = {
			state: this.state,
			history: this.history,
			handleCommand: this.handleCommand.bind(this),
			stateImageKey: this.props.stateImageKey,
			outputComponent: this.props.outputComponent
		}
		if (this.state.scene && this.props.sceneComponents[this.state.scene]) {
			return (
				<div className="Console" ref={(el) => this.containerElement = el}>
					{React.createElement(this.props.sceneComponents[this.state.scene], props, null)}
					<div ref={(el) => this.bottomElement = el}></div>
				</div>
			);
		} else {
			if (this.state.scene) {
				console.warn('Warning: The "' + this.state.scene + '" scene type is not assigned to a component');
			}
			return (
				<div className="Console" ref={(el) => this.containerElement = el}>
					<ActivityScene {...props} />
				</div>
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
	autoScroll: false,
	outputComponent: Output,
	stateImageKey: null
};

Console.propTypes = {
	driver: PropTypes.object.isRequired,
	autoScroll: PropTypes.bool,
	consoleDidUpdate: PropTypes.func,
}
