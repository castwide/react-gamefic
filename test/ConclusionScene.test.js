import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ConclusionScene } from '../src/ConclusionScene';
import { Output } from '../src/Output';

configure({ adapter: new Adapter() });

describe('<ConclusionScene />', () => {
    it('renders output', () => {
        let scene = shallow(<ConclusionScene />);
        expect(scene.find(Output).length).toBe(1);
    })
});
