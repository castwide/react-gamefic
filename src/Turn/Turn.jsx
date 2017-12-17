import React from 'react';
import {CommandLink} from '../CommandLink';

export class Turn extends React.Component {
	optionList() {
		return this.props.state.options.map((opt, index) => {
			return (
				<li key={index}>
					<CommandLink command={opt} handleCommand={this.props.handleCommand} />
				</li>				
			);
		});
	}

	nodeIsCommandWidget(node) {
		if (node.nodeName.toLowerCase() == 'a' && node.classList.contains('gamefic-command')) {
			return true;
		}
		if (node.nodeName.toLowerCase() == 'button' && node.classList.contains('gamefic-command')) {
			return true;
		}
		return false;
	}

	findAnchor(node) {
		while (!this.nodeIsCommandWidget(node)) {
			if (!node.parentNode) return false;
			node = node.parentNode;
		}
		return node;
	}

	clickCaptureHandler(event) {
		if (this.props.time == 'Present') {
			var a = this.findAnchor(event.target);
			if (a) {
				event.stopPropagation();
				this.props.handleCommand(a.getAttribute('data-command'));
			}
		}
	}

	render() {
		var kbd;
		if (this.props.state.lastPrompt || this.props.state.lastCommand) {
			kbd = <p><kbd>{this.props.state.lastPrompt} {this.props.state.lastCommand}</kbd></p>;
		}
		var ol;
		if (this.props.state.scene == 'MultipleChoice') {
			ol = <nav><ol>{this.optionList()}</ol></nav>;
		}
		return (
			<div className={'Turn ' + this.props.time} onClickCapture={(event) => this.clickCaptureHandler(event)}>
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
