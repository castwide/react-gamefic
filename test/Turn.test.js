import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import { Turn } from '../src/Turn';

configure({ adapter: new Adapter() });

let container;

describe('<Turn />', () => {
    it('renders messages', () => {
        let message = '<p class="state_message">Test</p>';
        let props = {
            output: {
                messages: message
            }
        }
        let element = mount(<Turn {...props} />);
        expect(element.html()).toContain(message);
    });

    describe('with command links', () => {
        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            document.body.removeChild(container);
            container = null;
        });

        it('handles links in Present', () => {
            let message = '<p><a href="#" class="gamefic-command" data-command="test"></a></p>';
            let received = '';
            let props = {
                time: 'Present',
                handleCommand: (cmd) => {
                    received = cmd;
                },
                output: {
                    messages: message
                }
            }
            act(() => {
                ReactDOM.render(<Turn {...props} />, container);
            });
            let a = container.querySelector('.gamefic-command');
            act(() => {
                a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(received).toBe('test');
        });

        it('disables links in Past', () => {
            let message = '<p><a href="#" class="gamefic-command" data-command="test"></a></p>';
            let received = '';
            let props = {
                time: 'Past',
                handleCommand: (cmd) => {
                    received = cmd;
                },
                output: {
                    messages: message
                }
            }
            act(() => {
                ReactDOM.render(<Turn {...props} />, container);
            });
            let a = container.querySelector('.gamefic-command');
            act(() => {
                a.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(received).toBe('');
        });
    });
});
