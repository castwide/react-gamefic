import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';
import {CommandForm} from '../CommandForm';

export class MultipleChoiceScene extends React.Component {
	optionList() {
		return this.props.state.options.map((opt, index) => {
		  return (
			<li key={index}>
			  <CommandLink command={opt} handleCommand={this.props.handleCommand} />
			</li>
		  );
		});
	}

	render() {
		return (
			<div className="MultipleChoiceScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<ol>{this.optionList()}</ol>
				<CommandForm {...this.props} />
			</div>
		);
	}
}
