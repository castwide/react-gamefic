import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ChoiceList } from '../src/ChoiceList';
import { CommandLink } from '../src/CommandLink';

configure({ adapter: new Adapter() });

describe('<MultipleChoiceScene />', () => {
    it('renders a ChoiceList', () => {
        let props = {
            options: ["First", "Second"],
            prompt: "Choose"
        }
        let scene = shallow(<ChoiceList {...props} />);
        expect(scene.find(CommandLink).length).toBe(2);
    })
});
