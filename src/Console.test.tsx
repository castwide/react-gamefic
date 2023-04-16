import React from 'react';
import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from '@testing-library/react';
import Console from './Console';
import TestDriver from '../fixtures/TestDriver';
import TestScene from '../fixtures/TestScene';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup();

// @todo Apparently not available in the testing-library screen
window.HTMLElement.prototype.scrollIntoView = function() {};

describe('<Console />', () => {
    it('renders a loading screen', () => {
        const driver = new TestDriver();
        driver.stop = true;
        render(<Console driver={driver} namedScenes={{test: TestScene}} />);
        expect(screen.getByText(/loading/)).toBeInTheDocument();
    });

    it('starts the game', () => {
        const driver = new TestDriver();
        render(<Console driver={driver} namedScenes={{test: TestScene}} />);
        waitFor(() => screen.getByText(/introduction/)).then((result) => {
            expect(result).toBeInTheDocument()
        })
    });

    it('responds to a a command', () => {
        const driver = new TestDriver();
        render(<Console driver={driver} namedScenes={{test: TestScene}} />);
        waitFor(() => screen.getByText(/introduction/)).then(() => {
            act(() => {
                const input = screen.getByRole('input');
                user.type(input, 'command{Enter}')
            });
            waitFor(() => screen.getByText(/turn 1/)).then((result) => {
                expect(result).toBeInTheDocument()
            })
        })
    });

    it('keeps history', async () => {
        const driver = new TestDriver();
        render(<Console driver={driver} namedScenes={{test: TestScene}} />);
        waitFor(() => screen.getByText(/introduction/)).then(() => {
            act(() => {
                const input = screen.getByRole('input');
                user.type(input, 'command{Enter}')
            });
            waitFor(() => screen.getByText(/turn 1/)).then((result) => {
                expect(result).toBeInTheDocument();
                act(() => {
                    const input = screen.getByRole('input');
                    user.type(input, 'command{Enter}')
                });
                waitFor(() => screen.getByText(/turn 2/)).then(() => {
                    expect(screen.getByText(/turn 1/)).toBeInTheDocument();
                });
            });
        });
    });
});
