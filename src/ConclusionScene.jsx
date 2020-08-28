import React from 'react';
import { Output } from './Output';

export class ConclusionScene extends React.Component {
	renderChildren() {
		return <Output {...this.props} />;
	}

	render() {
		return (
			<div className="ConclusionScene">
				{this.props.children || this.renderChildren()}
			</div>
		);
	}
}
