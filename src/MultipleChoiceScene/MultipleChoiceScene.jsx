import React from 'react';
import {Output} from '../Output';
import {CommandLink} from '../CommandLink';
import {CommandForm} from '../CommandForm';

export class MultipleChoiceScene extends React.Component {
	render() {
		return (
			<div className="MultipleChoiceScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
				<CommandForm prompt={this.props.state.prompt} />
			</div>
		);
	}
}
