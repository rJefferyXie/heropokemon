import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Starters from '../components/starters';

configure({ adapter: new Adapter() });

describe('Testing Starters Component', () => {
  it('Loads three pokemon card components.', () => {
    const wrapper = shallow( <Starters /> );
    const container = wrapper.find('.container');
    expect(container).toHaveLength(3);
  })
})