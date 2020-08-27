import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Console } from '../src/Console';

configure({ adapter: new Adapter() });

describe('<Console />', () => {
    it('requires a driver', () => {
        expect(() => {
            shallow(<Console />);
        }).toThrow(TypeError);
    });

    it('sets an update callback', () => {
        let driver = {};
        let configured = false;
        driver.onUpdate = jest.fn(() => {
            configured = true;
        });
        shallow(<Console driver={driver} />);
        expect(configured).toBe(true);
    });
});
