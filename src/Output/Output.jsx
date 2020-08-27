import React from 'react';
import {History} from '../History';
import {Turn} from '../Turn';
import PropTypes from 'prop-types';

export class Output extends React.Component {
	constructor(props) {
		super(props);
	}

	renderHistory() {
		if (this.props.history) {
			return <History {...this.props} />;
		}
	}

	render() {
		return (
			<div className="Output">
				{this.renderHistory()}
				<Turn state={this.props.state} handleCommand={this.props.handleCommand} time="Present" />
			</div>
		)
	}
}

Output.defaultProps = {
	history: true
};

Output.propTypes = {
	history: PropTypes.bool
}
