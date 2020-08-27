import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MultipleChoiceScene } from '../src/MultipleChoiceScene';
import { CommandLink } from '../src/CommandLink';

configure({ adapter: new Adapter() });

describe('<MultipleChoiceScene />', () => {
    it('renders options', () => {
        let props = {
            state: {
                options: ["First", "Second"],
                prompt: "Choose"
            }
        }
        let scene = shallow(<MultipleChoiceScene {...props} />);
        expect(scene.find(CommandLink).length).toBe(2);
    })
});
