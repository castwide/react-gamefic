import React from 'react';
import { Output } from './Output';
import { ChoiceList } from './ChoiceList';

export class MultipleChoiceScene extends React.Component {
	renderChildren() {
		return (
			<>
				<Output {...this.props} />,
				<ChoiceList options={this.props.state.options} prompt={this.props.state.prompt} />
			</>
		);
	}

	render() {
		return (
			<div className="MultipleChoiceScene">
				{this.props.children || this.renderChildren()}
			</div>
		);
	}
}
