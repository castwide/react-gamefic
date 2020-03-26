import React from 'react';
import {Output} from '../Output';

export class ConclusionScene extends React.Component {
	render() {
		return (
			<div className="ActivityScene">
				{React.createElement(this.props.outputComponent, this.props, null)}
			</div>
		);
	}
}
