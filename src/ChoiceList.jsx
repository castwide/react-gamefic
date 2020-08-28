import React from 'react';
import { CommandLink } from './CommandLink';
import { PropTypes } from 'prop-types';

export class ChoiceList extends React.Component {
    renderChoices() {
        const listItems = this.props.options.map((opt, index) => {
            return (
                <li key={index}>
                    <CommandLink command={opt}>{opt}</CommandLink>
                </li>
            );
        });
        return (
            <nav>
                <ol>
                    {listItems}
                </ol>
            </nav>
        );
    }

    render() {
        return (
            <div className="ChoiceList">
                <label>{this.props.prompt}</label>
                {this.renderChoices()}
            </div>
        );
    }
}

ChoiceList.defaultProps = {
    options: []
};

ChoiceList.propTypes = {
    options: PropTypes.arrayOf(PropTypes.any)
};
