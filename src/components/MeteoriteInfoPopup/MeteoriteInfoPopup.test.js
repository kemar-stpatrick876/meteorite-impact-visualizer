import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeteoriteInfoPopup from './MeteoriteInfoPopup';
import { formattedDate } from '../../utils';
import { MOCK_DATA } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('MeteoriteInfoPopup.js', () => {
  const data = MOCK_DATA[0];
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
