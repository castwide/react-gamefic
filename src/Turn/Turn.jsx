import React from 'react';

export class Turn extends React.Component {
	render() {
		console.log(JSON.stringify(this.props.state));
		return (
			<div className={'Turn ' + this.props.time}>
				<p><kbd>C: {this.props.state.lastCommand}</kbd></p>
				<div dangerouslySetInnerHTML={{ __html: this.props.state.output }}></div>
			</div>
		);
	}
}

Turn.defaultProps = {
	time: 'Past'
}
