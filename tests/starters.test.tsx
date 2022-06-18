import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Starters from '../components/starters';
import StarterCard from '../components/starterCard';

configure({ adapter: new Adapter() });

describe('Testing Starters Component', () => {
  it('Loads without crashing.', () => {
    const wrapper = shallow( <Starters /> );
    const title = wrapper.find('.title');
    expect(title.text()).toEqual('Choose a Starter!');
  });
});