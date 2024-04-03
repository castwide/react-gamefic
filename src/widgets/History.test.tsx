import React from 'react';
import History from './History';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const history = [
    {
        messages: 'first'
    },
    {
        messages: 'second'
    },
    {
        messages: '<button data-command="test">Test</button>'
    }
]

let executed = false;
const handleInput = (_text) => { executed = true; }

describe('<History />', () => {
    it('renders turns', () => {
        render(<History turns={history} />);

        expect(screen.getByText(/first/)).toBeInTheDocument();
        expect(screen.getByText(/second/)).toBeInTheDocument();
    });

    it('disabled command links', () => {
        render(<History turns={history} handleInput={handleInput} />);

        const button = screen.getByRole('button');
        button.click();
        expect(executed).toBe(false);
    });
});
