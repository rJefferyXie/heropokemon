import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Starters from '../components/starters';

configure({ adapter: new Adapter() });

describe('Testing Starters Component', () => {
  it('Loads three pokemon card components.', () => {
    const wrapper = shallow( <Starters /> );
    const container = wrapper.find('.container').children();
    expect(container).toHaveLength(3);
  });

  it('First pokemon is grass type.', () => {
    const wrapper = shallow( <Starters /> );
    const container = wrapper.find('.container').childAt(0);
    expect(container.render().text()).toBe("grass");
  });

  it('Second pokemon is fire type.', () => {
    const wrapper = shallow( <Starters /> );
    const container = wrapper.find('.container').childAt(1);
    expect(container.render().text()).toBe("fire");
  });

  it('Third pokemon is water type.', () => {
    const wrapper = shallow( <Starters /> );
    const container = wrapper.find('.container').childAt(2);
    expect(container.render().text()).toBe("water");
  });
});