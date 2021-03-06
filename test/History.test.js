import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { History } from '../src/History';
import { Turn } from '../src/Turn';

configure({ adapter: new Adapter() });

describe('<History />', () => {
    it('renders turns', () => {
        let states = [
            {
                messages: "<p>First</p>"
            },
            {
                messages: "<p>Second</p>"
            }
        ]
        let element = shallow(<History states={states} />);
        expect(element.find(Turn).length).toBe(2);
    })
});
