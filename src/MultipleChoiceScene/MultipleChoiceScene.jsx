import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';

export class MultipleChoiceScene extends React.Component {
	renderChoices() {
		if (this.props.state.options) {
			const listItems = this.props.state.options.map((opt, index) =>
				<li key={index}>
					<CommandLink command={opt}>{opt}</CommandLink>
				</li>
			);
			return (
				<nav>
					{this.props.state.options}
					<ol>
						{listItems}
					</ol>
				</nav>
			);
		} else {
			console.warn("Error: Multiple choice scene does not have any options");
		}
	}

	render() {
		return (
			<div className="MultipleChoiceScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<label>{this.props.state.prompt}</label>
				{this.renderChoices()}
			</div>
		);
	}
}
