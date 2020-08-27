import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Output } from '../src/Output';
import { History } from '../src/History';
import { Turn } from '../src/Turn';

configure({ adapter: new Adapter() });

describe('<Output />', () => {
    it('renders History and Turn', () => {
        let output = shallow(<Output />);
        expect(output.find(History).length).toBe(1);
        expect(output.find(Turn).length).toBe(1);
    });

    it('disables History on request', () => {
        let output = shallow(<Output history={false} />);
        expect(output.find(History).length).toBe(0);
        expect(output.find(Turn).length).toBe(1);
    });
});
