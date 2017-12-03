import React from 'react';
import {CommandLink} from '../CommandLink';

export class Turn extends React.Component {
	optionList() {
		var that = this;
		return this.props.state.options.map((opt, index) => {
		  return (
			<li key={index}>
			  <CommandLink command={opt} handleCommand={that.props.handleCommand} />
			</li>
		  );
		});
	}

	render() {
		var kbd;
		if (this.props.state.lastCommand) {
			kbd = <p><kbd>{this.props.state.lastPrompt} {this.props.state.lastCommand}</kbd></p>;
		}
		var ol;
		if (this.props.state.scene == 'MultipleChoice') {
			ol = <ol>{this.optionList()}</ol>;
		}
		return (
			<div className={'Turn ' + this.props.time}>
				{kbd}
				<div dangerouslySetInnerHTML={{ __html: this.props.state.output }}></div>
				{ol}
			</div>
		);
	}
}

Turn.defaultProps = {
	time: 'Past'
}
