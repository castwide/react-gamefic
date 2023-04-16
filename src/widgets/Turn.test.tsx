import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Turn from './Turn';

const output = {
    messages: '<p>A message</p>',
    last_input: 'command',
    last_prompt: 'prompt'
}

describe('<Turn />', () => {
    it('renders messages', () => {
        render(<Turn output={output} />);
        expect(screen.getByText('A message')).toBeInTheDocument();
    });

    it('renders last input', () => {
        render(<Turn output={output} />);
        expect(screen.getByText(/command/)).toBeInTheDocument();
    })

    it('renders last prompt', () => {
        render(<Turn output={output} />);
        expect(screen.getByText(/prompt/)).toBeInTheDocument();
    })
});
