import React from 'react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CommandLink from './CommandLink';

const user = userEvent.setup();

let received: string | null = null;

const handleInput = (input: string) => {
    received = input;
};

afterEach(() => {
    received = null;
});

describe('<CommandLink />', () => {
    it('sends commands from clicks', async () => {
        render(<CommandLink command="command" handleInput={handleInput}>Click Me</CommandLink>)

        const link = screen.getByRole('link');
        await user.click(link);

        expect(received).toEqual('command');
    });
});
