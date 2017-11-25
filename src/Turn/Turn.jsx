import React from 'react';

export class Turn extends React.Component {
	render() {
		var kbd;
		if (this.props.state.lastCommand) {
			kbd = <p><kbd>C: {this.props.state.lastCommand}</kbd></p>;
		}
		return (
			<div className={'Turn ' + this.props.time}>
				{kbd}
				<div dangerouslySetInnerHTML={{ __html: this.props.state.output }}></div>
			</div>
		);
	}
}

Turn.defaultProps = {
	time: 'Past'
}
