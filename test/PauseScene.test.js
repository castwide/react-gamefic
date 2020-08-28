import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PauseScene } from '../src/PauseScene';
import { Output } from '../src/Output';

configure({ adapter: new Adapter() });

describe('<PauseScene />', () => {
    it('renders output', () => {
        let props = {
            state: {}
        };
        let scene = shallow(<PauseScene {...props} />);
        expect(scene.find(Output).length).toBe(1);
    });

    it('renders children', () => {
        let scene = shallow(<PauseScene><img /></PauseScene>);
        expect(scene.find('img').length).toBe(1);
    });
});
