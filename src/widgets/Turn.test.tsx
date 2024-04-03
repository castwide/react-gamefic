import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Turn from './Turn';

const output = {
    messages: '<p>A message</p> with <button data-command="test">a link</button>',
    last_input: 'example command',
    last_prompt: 'example prompt'
}

let executed = false;
const handleInput = (_text) => { executed = true; }

describe('<Turn />', () => {
    it('renders messages', () => {
        render(<Turn output={output} />);
        expect(screen.getByText('A message')).toBeInTheDocument();
    });

    it('renders last input', () => {
        render(<Turn output={output} />);
        expect(screen.getByText(/example command/)).toBeInTheDocument();
    });

    it('renders last prompt', () => {
        render(<Turn output={output} />);
        expect(screen.getByText(/example prompt/)).toBeInTheDocument();
    });

    it('enables command links', () => {
        render(<Turn output={output} handleInput={handleInput} />)

        const button = screen.getByRole('button');
        button.click();
        expect(executed).toBe(true);
    });
});
