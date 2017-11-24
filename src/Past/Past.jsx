import React from 'react';

export class Past extends React.Component {
	render() {
		console.log(JSON.stringify(this.props.state));
		return (
			<div className="Past">
				<p><kbd>C: {this.props.state.lastCommand}</kbd></p>
				<div dangerouslySetInnerHTML={{ __html: this.props.state.output }}></div>
			</div>
		);
	}
}
