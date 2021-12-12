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

	render() {
		if (this.props.state.scene && this.props.sceneComponents[this.props.state.scene]) {
			return (
				<div className="Terminal" ref={(el) => this.containerElement = el}>
					{React.createElement(this.props.sceneComponents[this.props.state.scene], this.props, null)}
					<div ref={(el) => this.bottomElement = el}></div>
				</div>
			);
		} else {
			if (this.props.state.scene) {
				console.warn('Warning: The "' + this.props.state.scene + '" scene type is not assigned to a component');
				return (
					<div className="Terminal" ref={(el) => this.containerElement = el}>
						<ActivityScene {...this.props} />
						<div ref={(el) => this.bottomElement = el}></div>
					</div>
				);
			} else {
				return null;
			}
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
	sceneComponents: PropTypes.object,
	autoScroll: PropTypes.bool
}
