import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeteoriteMap from './MeteoriteMap';
import { MOCK_DATA } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('MeteoriteMap.js', () => {
  const wrapper = shallow(<MeteoriteMap meteoriteImpacts={MOCK_DATA} />);

  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should show popup', () => {
    const instance = wrapper.instance();

    expect(wrapper.find('MeteoriteInfoPopup').exists()).toBeFalsy();
    instance.onClickMarker(instance.props.meteoriteImpacts[0]);
    expect(wrapper.find('MeteoriteInfoPopup').exists()).toBeTruthy();
  });
});
