import React from 'react';
import {Output} from './Output';

export class ConclusionScene extends React.Component {
	render() {
		return (
			<div className="ConclusionScene">
				<Output {...this.props} />
			</div>
		);
	}
}
