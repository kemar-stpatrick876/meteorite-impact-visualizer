import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImpactMap from './ImpactMap';
import { formattedDate } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });

describe.only('MeteoriteInfoPopup.js', () => {
  const wrapper = shallow(<ImpactMap />);

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
