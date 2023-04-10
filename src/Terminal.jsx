import React from 'react';
import { ActivityScene } from './ActivityScene';
import { MultipleChoiceScene } from './MultipleChoiceScene';
import { PauseScene } from './PauseScene';
import { ConclusionScene } from './ConclusionScene';
import PropTypes from 'prop-types';

export class Terminal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		if (this.props.autoScroll) {
			this.bottomElement.scrollIntoView({ block: 'end', behavior: 'smooth' });
		}
	}


	select_scene() {
		const name = this.props.state.scene?.type || this.props.state.scene;
		const available = this.props.sceneComponents[name];
		if (available) {
			return available;
		} else {
			console.warn('Warning: The "' + name + '" scene type is not assigned to a component');
			return ActivityScene;
		}
	}

	render() {
		const sceneComponent = this.select_scene();
		return (
			<div className="Terminal" ref={(el) => this.containerElement = el}>
				{React.createElement(sceneComponent, this.props, null)}
				<div ref={(el) => this.bottomElement = el}></div>
			</div>
		);
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
	sceneComponents: PropTypes.object,
	autoScroll: PropTypes.bool
}
