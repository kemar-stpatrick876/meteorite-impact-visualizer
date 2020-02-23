import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MapContainer } from './MapContainer';
import { MOCK_DATA } from '../../constants';

const initialDateRange = { start: '2010-01-01', end: '2020-01-01' };
Enzyme.configure({ adapter: new Adapter() });

describe('MapContainer.js', () => {
  const wrapper = shallow(
    <MapContainer meteorites={MOCK_DATA} displayRange={initialDateRange} />
  );

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
