import React from 'react';
import { Output } from './Output';
import { ChoiceList } from './ChoiceList';

export class MultipleChoiceScene extends React.Component {
	renderChildren() {
		return (
			<>
				<Output {...this.props} />,
				<ChoiceList options={this.props.output.options} prompt={this.props.output.prompt} />
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
