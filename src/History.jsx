import React from 'react';
import { Turn } from './Turn';
import PropTypes from 'prop-types';

export class History extends React.Component {
	renderTurns() {
		return this.props.outputs.map((opt, index) => {
			return (
				<Turn key={index} time="Past" handleCommand={this.props.handleCommand} output={opt} />
			);
		});
	}

	render() {
		return (
			<div className="History">
				{this.renderTurns()}
			</div>
		);
	}
}

History.defaultProps = {
	outputs: []
};

History.propTypes = {
	outputs: PropTypes.arrayOf(PropTypes.any),
};
