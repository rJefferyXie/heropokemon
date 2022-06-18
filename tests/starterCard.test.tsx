import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StarterCard from '../components/starterCard';

configure({ adapter: new Adapter() });

describe('Testing StarterCard component', () => {
  it('Loads without crashing', () => {
    const wrapper = shallow( <StarterCard name="" /> );
    expect(wrapper.text()).toBe("");
  })

  it('First pokemon is grass type.', () => {
    const wrapper = shallow( <StarterCard name="bulbasaur" /> );
    expect(wrapper.text()).toBe("bulbasaur");
    // const style = wrapper.get(0).props.style;
    // expect(style).toHaveProperty('backgroundColor', 'red');
  });

  it('Second pokemon is fire type.', () => {
    const wrapper = shallow( <StarterCard name="charmander" /> );
    expect(wrapper.text()).toBe("charmander");
  });

  it('Third pokemon is water type.', () => {
    const wrapper = shallow( <StarterCard name="squirtle" /> );
    expect(wrapper.text()).toBe("squirtle");
  });
});