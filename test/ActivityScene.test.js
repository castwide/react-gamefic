import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ActivityScene } from '../src/ActivityScene';
import { Output } from '../src/Output';
import { CommandForm } from '../src/CommandForm';

configure({ adapter: new Adapter() });

describe('<ActivityScene />', () => {
    it('renders output and form', () => {
        let scene = shallow(<ActivityScene />);
        expect(scene.find(Output).length).toBe(1);
        expect(scene.find(CommandForm).length).toBe(1);
    });

    it('renders children', () => {
        let scene = shallow(<ActivityScene><img /></ActivityScene>);
        expect(scene.find('img').length).toBe(1);
    });
});
