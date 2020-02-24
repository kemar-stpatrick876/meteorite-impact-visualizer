import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App.js', () => {
  const wrapper = shallow(<App />);

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
