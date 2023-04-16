import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import OptionList from './OptionList';

const options = [
  'first',
  'second'
]
describe('<OptionList />', () => {
    it('adds options to a list of command links', async () => {
        render(<OptionList options={options} />);

        const links = screen.getAllByRole('link').map((lnk) => { return lnk.textContent });
        expect(links).toEqual(['first', 'second']);
    });
});
