import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeteoriteInfoPopup from './MeteoriteInfoPopup';
import { formattedDate } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
const data = {
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
};

describe.only('MeteoriteInfoPopup.js', () => {
  const wrapper = shallow(<MeteoriteInfoPopup info={data} />);

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should render info text', () => {
    expect(wrapper.text().includes(data.name)).toBe(true);
    expect(wrapper.text().includes(data.nametype)).toBe(true);
    expect(wrapper.text().includes(data.recclass)).toBe(true);
    expect(wrapper.text().includes(data.fall)).toBe(true);
    expect(wrapper.text().includes(data.mass)).toBe(true);
    expect(wrapper.text().includes(data.reclong)).toBe(true);
    expect(wrapper.text().includes(data.reclat)).toBe(true);
    expect(wrapper.text().includes(formattedDate(data.year))).toBe(true);
  });
});
