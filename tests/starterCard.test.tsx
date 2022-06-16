import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StarterCard from '../components/starterCard';

configure({ adapter: new Adapter() });

describe('Testing StarterCard component', () => {
  it('First pokemon is grass type.', () => {
    const wrapper = shallow( <StarterCard name="grass" /> );
    expect(wrapper.text()).toBe("grass");
  });
});