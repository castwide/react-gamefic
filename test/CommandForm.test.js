import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommandForm } from '../src/CommandForm';
import { Console } from '../src/Console';
import { expect, it, jest } from '@jest/globals';

configure({ adapter: new Adapter() });

describe('<CommandForm />', () => {
    it('renders a form', () => {
        let form = mount(<CommandForm />);
        expect(form.find('form').length).toBe(1);
    });

    it('passes command submissions to the console', () => {
        let received = '';
        let driver = {
            onUpdate: jest.fn(() => {
                return;
            }),
            receive: jest.fn((data) => {
                received = data;
            })
        };
        let cons = ReactTestUtils.renderIntoDocument(
            <Console driver={driver}>
                <CommandForm />
            </Console>
        );
        let form = ReactTestUtils.findRenderedComponentWithType(cons, CommandForm);
        form.textInput.value = 'test';
        ReactTestUtils.Simulate.change(form.textInput);
        ReactTestUtils.Simulate.submit(form.formElement);
        expect(received).toBe('test');
    });
});
