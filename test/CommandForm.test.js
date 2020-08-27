import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommandForm } from '../src/CommandForm';

configure({ adapter: new Adapter() });

describe('<CommandForm />', () => {
    it('renders a form', () => {
        let link = mount(<CommandForm />);
        expect(link.find('form').length).toBe(1);
    });
});
