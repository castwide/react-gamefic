import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MultipleChoiceScene } from '../src/MultipleChoiceScene';
import { ChoiceList } from '../src/ChoiceList';

configure({ adapter: new Adapter() });

describe('<MultipleChoiceScene />', () => {
    it('renders a ChoiceList', () => {
        let props = {
            state: {
                options: ["First", "Second"],
                prompt: "Choose"
            }
        }
        let scene = shallow(<MultipleChoiceScene {...props} />);
        expect(scene.find(ChoiceList).length).toBe(1);
    })

    it('renders children', () => {
        let scene = shallow(<MultipleChoiceScene><img /></MultipleChoiceScene>);
        expect(scene.find('img').length).toBe(1);
    });
});
