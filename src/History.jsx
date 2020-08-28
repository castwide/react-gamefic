import React from 'react';
import { Turn } from './Turn';
import PropTypes from 'prop-types';

export class History extends React.Component {
	renderTurns() {
		return this.props.states.map((opt, index) => {
			return (
				<Turn key={index} time="Past" handleCommand={this.props.handleCommand} state={opt} />
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
	states: []
};

History.propTypes = {
	states: PropTypes.arrayOf(PropTypes.any),
};
