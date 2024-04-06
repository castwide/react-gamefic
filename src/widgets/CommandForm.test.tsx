import React from 'react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CommandForm from './CommandForm';

const user = userEvent.setup();

let received: string | null = null;

const handleInput = (input: string) => {
    received = input;
};

afterEach(() => {
    received = null;
});

describe('<CommandForm />', () => {
    it('handles input from the button', async () => {
        render(<CommandForm prompt=">" handleInput={handleInput} />)

        const input = screen.getByRole('textbox');
        await user.type(input, 'command');
        const button = screen.getByRole('button');
        await user.click(button);

        expect(received).toEqual('command');
    });

    it('handles input from the enter key', async () => {
        render(<CommandForm prompt=">" handleInput={handleInput} />)

        const input = screen.getByRole('textbox');
        await user.type(input, 'command{Enter}');

        expect(received).toEqual('command');
    });
});
