import React from 'react';

export class StateImage extends React.Component {
	render() {
		console.log('The image key is ' + this.props.stateImageKey);
		console.log('The image is ' + this.props.state[this.props.stateImageKey]);
		var image;
		if (this.props.stateImageKey && this.props.state[this.props.stateImageKey]) {
			image = <img src={'media/' + this.props.state[this.props.stateImageKey]} />;
		}
		return (
			<div className="StateImage">
				{image}
			</div>
		);
	}
}
