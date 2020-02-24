import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeteoritePin from './MeteoritePin';
import { MOCK_DATA } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

const mockOnMarkerClick = jest.fn();

describe('MeteoritePin.js', () => {
  test('should render', () => {
    const wrapper = shallow(
      <MeteoritePin data={MOCK_DATA} onClick={mockOnMarkerClick} />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.meteorite-map-pin').length).toBe(2);
  });

  test('should pass data to click callback', () => {
    const wrapper = shallow(
      <MeteoritePin data={[MOCK_DATA[0]]} onClick={mockOnMarkerClick} />
    );
    wrapper.find('svg').simulate('click');
    expect(mockOnMarkerClick.mock.calls[0][0]).toEqual(MOCK_DATA[0]);
  });
});
