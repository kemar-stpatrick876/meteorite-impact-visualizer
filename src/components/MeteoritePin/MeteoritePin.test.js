import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeteoritePin from './MeteoritePin';

Enzyme.configure({ adapter: new Adapter() });
const data = [
  {
    name: 'Aachen',
    id: '1',
    nametype: 'Valid',
    recclass: 'L5',
    mass: '21',
    fall: 'Fell',
    year: '1880-01-01T00:00:00.000',
    reclat: '50.775000',
    reclong: '6.083330',
    geolocation: { type: 'Point', coordinates: [6.08333, 50.775] }
  },
  {
    name: 'Aarhus',
    id: '2',
    nametype: 'Valid',
    recclass: 'H6',
    mass: '720',
    fall: 'Fell',
    year: '1951-01-01T00:00:00.000',
    reclat: '56.183330',
    reclong: '10.233330',
    geolocation: { type: 'Point', coordinates: [10.23333, 56.18333] }
  }
];

const mockOnMarkerClick = jest.fn();

describe.only('MeteoritePin.js', () => {
  test('should render', () => {
    const wrapper = shallow(
      <MeteoritePin data={data} onClick={mockOnMarkerClick} />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.meteorite-map-pin').length).toBe(2);
  });

  test('should pass data to click callback', () => {
    const wrapper = shallow(
      <MeteoritePin data={[data[0]]} onClick={mockOnMarkerClick} />
    );
    wrapper.find('svg').simulate('click');
    expect(mockOnMarkerClick.mock.calls[0][0]).toEqual(data[0]);
  });
});
