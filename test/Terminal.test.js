import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Terminal } from '../src/Terminal';
import { ActivityScene } from '../src/ActivityScene';

configure({ adapter: new Adapter() });

describe('<Terminal />', () => {
    it('selects the scene from the state', () => {
        let props = {
            state: {
                scene: 'Activity'
            }
        };
        let terminal = shallow(<Terminal {...props} />);
        expect(terminal.find(ActivityScene).length).toBe(1);
    });

    it('selects custom scenes', () => {
        const Foo = function (props) {
            return <Foo>Foo</Foo>;
        };
        let props = {
            state: {
                scene: 'Foo'
            }
        };
        let terminal = shallow(<Terminal
            {...props}
            sceneComponents={{
                Foo: Foo
            }}
        />);
        expect(terminal.find(Foo).length).toBe(1);
    });

    it('defaults to activity', () => {
        const Foo = function (props) {
            return <Foo>Foo</Foo>;
        };
        let props = {
            state: {
                scene: 'Bar'
            }
        };
        let terminal = shallow(<Terminal
            {...props}
            sceneComponents={{
                Foo: Foo
            }}
        />);
        expect(terminal.find(ActivityScene).length).toBe(1);
    });
});
