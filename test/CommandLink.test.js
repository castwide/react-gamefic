import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommandLink } from '../src/CommandLink';

configure({ adapter: new Adapter() });

describe('<CommandLink />', () => {
	it('renders a link', () => {
		let link = shallow(<CommandLink command="do">do</CommandLink>);
		expect(link.find('a').length).toBe(1);
	})
});
