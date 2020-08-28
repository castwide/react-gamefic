import React from 'react';
import {History} from './History';
import {Turn} from './Turn';
import PropTypes from 'prop-types';

export class Output extends React.Component {
	constructor(props) {
		super(props);
	}

	renderHistory() {
		if (this.props.transcribe) {
			return <History states={this.props.history} />;
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
	transcribe: true
};

Output.propTypes = {
	history: PropTypes.arrayOf(PropTypes.any),
	transcribe: PropTypes.bool
};
