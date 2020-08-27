import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Turn } from '../src/Turn';

configure({ adapter: new Adapter() });

describe('<Turn />', () => {
    it('renders messages', () => {
        let message = '<p class="state_message">Test</p>';
        let props = {
            state: {
                messages: message
            }
        }
        let element = mount(<Turn {...props} />);
        expect(element.html()).toContain(message);
    })
});
