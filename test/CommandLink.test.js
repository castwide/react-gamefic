import React from 'react';
import { configure, shallow, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommandLink } from '../src/CommandLink';
import { Console } from '../src/Console';

configure({ adapter: new Adapter() });

describe('<CommandLink />', () => {
	it('renders a link', () => {
		let link = shallow(<CommandLink command="do">do</CommandLink>);
		expect(link.find('a').length).toBe(1);
	});

	it('responds to a click', () => {
        let driver = {};
		let received = null;
        driver.receive = jest.fn((message) => {
			received = message;
		});
		driver.onUpdate = jest.fn();
		let console = mount(
			<Console driver={driver}>
				<CommandLink command="success">Click Me</CommandLink>
			</Console>
		);
		console.find(CommandLink).simulate('click');
		expect(received).toEqual("success");
	});
});
