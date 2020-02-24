import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
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

  test('should fetch meteorites list', () => {
    const doFetchAllMeteorites = jest.fn();

    shallow(
      <MapContainer
        doFetchAllMeteorites={doFetchAllMeteorites}
        displayRange={initialDateRange}
      />
    );

    expect(doFetchAllMeteorites).toHaveBeenCalled();
  });

  test('should trigger set display range dispatch function', () => {
    const doSetDisplayRange = jest.fn();
    const doFetchAllMeteorites = jest.fn();

    const newDateRange = { start: '2015-01-01', end: '2020-01-01' };

    const component = mount(
      <MapContainer
        doSetDisplayRange={doSetDisplayRange}
        doFetchAllMeteorites={doFetchAllMeteorites}
        displayRange={initialDateRange}
      />
    );
    component.instance().onDateRangeChange(newDateRange);

    expect(doSetDisplayRange).toHaveBeenCalledWith(newDateRange);
  });
});
