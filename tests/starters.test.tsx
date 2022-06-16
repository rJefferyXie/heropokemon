import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Starters from '../components/starters';

configure({ adapter: new Adapter() });

describe('Starters component renders without crashing.', () => {
  it('Loads three pokemon card components.', () => {
    const wrapper = shallow( <Starters /> );
    expect(wrapper).toHaveLength(1);
  })
})