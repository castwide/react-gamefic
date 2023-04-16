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
    }
]

describe('<History />', () => {
    it('renders turns', () => {
        render(<History turns={history} />);

        expect(screen.getByText(/first/)).toBeInTheDocument();
        expect(screen.getByText(/second/)).toBeInTheDocument();
    })
});
