import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MultipleChoiceScene } from '../src/MultipleChoiceScene';
import { ChoiceList } from '../src/ChoiceList';
import { CommandLink } from '../src/CommandLink';

configure({ adapter: new Adapter() });

describe('<MultipleChoiceScene />', () => {
    it('renders a ChoiceList', () => {
        let props = {
            state: {
                options: ["First", "Second"],
                prompt: "Choose"
            }
        }
        let scene = mount(<MultipleChoiceScene {...props} />);
        expect(scene.find(ChoiceList).length).toBe(1);
        expect(scene.find(CommandLink).length).toBe(2);
    });

    it('renders children', () => {
        let scene = shallow(<MultipleChoiceScene><img /></MultipleChoiceScene>);
        expect(scene.find('img').length).toBe(1);
    });
});
