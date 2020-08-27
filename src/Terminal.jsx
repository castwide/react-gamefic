import React from 'react';
import { ActivityScene } from './ActivityScene';
import { MultipleChoiceScene } from './MultipleChoiceScene';
import { PauseScene } from './PauseScene';
import { ConclusionScene } from './ConclusionScene';
import PropTypes from 'prop-types';

export class Terminal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.history = [];
		this.lastCommand = null;
		this.lastPrompt = null;
	}

	componentDidUpdate() {
		this.history.push(Object.assign({}, this.props.state));
		if (this.props.autoScroll) {
			this.bottomElement.scrollIntoView({ behavior: 'smooth' });
		}
	}

	render() {
		var props = {
			state: this.props.state,
			history: this.history,
			handleCommand: this.props.handleCommand
		}
		if (this.props.state.scene && this.props.sceneComponents[this.props.state.scene]) {
			return (
				<div className="Terminal" ref={(el) => this.containerElement = el}>
					{React.createElement(this.props.sceneComponents[this.props.state.scene], props, null)}
					<div ref={(el) => this.bottomElement = el}></div>
				</div>
			);
		} else {
			if (this.props.state.scene) {
				console.warn('Warning: The "' + this.props.state.scene + '" scene type is not assigned to a component');
			}
			return (
				<div className="Terminal" ref={(el) => this.containerElement = el}>
					<ActivityScene {...props} />
					<div ref={(el) => this.bottomElement = el}></div>
				</div>
			);
		}
	}
}

Terminal.defaultProps = {
	sceneComponents: {
		Activity: ActivityScene,
		Pause: PauseScene,
		MultipleChoice: MultipleChoiceScene,
		YesOrNo: MultipleChoiceScene,
		Conclusion: ConclusionScene
	},
	autoScroll: true
};

Terminal.propTypes = {
	autoScroll: PropTypes.bool
}
