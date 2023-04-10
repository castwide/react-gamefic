import React from 'react';
import { configure, shallow, mount } from 'enzyme';
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

    it('builds a state history', () => {
        let driver = {};
        driver.onUpdate = jest.fn((callback) => {
            driver.update = callback;
        });
        let element = mount(<Console driver={driver} />);

        driver.update({ messages: "first" });
        expect(element.state().output.messages).toEqual("first");
        expect(element.state().history).toEqual([]);

        driver.update({ messages: "second" });
        expect(element.state().output.messages).toEqual("second");
        expect(element.state().history).toEqual([{ messages: "first" }]);
    });
});
