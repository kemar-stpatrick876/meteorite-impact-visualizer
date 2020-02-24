import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { History } from './History';

Enzyme.configure({ adapter: new Adapter() });

describe('History.js', () => {
  test('should render', () => {
    const wrapper = shallow(<History history={[]} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.history-table'));
    expect(wrapper.text().includes('History')).toBe(true);
  });

  test('should render table without records', () => {
    const wrapper = shallow(<History history={[]} />);
    expect(wrapper.find('tbody').children().length).toBe(1);
    expect(
      wrapper.text().includes('There are currently no history records')
    ).toBe(true);
  });
  test('should render table with records', () => {
    const history = [
      {
        timestamp: '2020-02-23T22:30:46.348Z',
        id: '53829',
        original: 'myAwesomeMeteorite',
        updated: 'myAwesomeMeteorite2',
        field: 'name'
      },
      {
        timestamp: '2020-02-23T22:40:46.348Z',
        id: '53829',
        original: 'myAwesomeMeteorite',
        updated: 'myAwesomeMeteorite3',
        field: 'name'
      },
      {
        timestamp: '2020-02-23T22:35:55.099Z',
        id: '54823',
        original: '2011-01-01T00:00:00.000',
        updated: '2010-01-01',
        field: 'year'
      }
    ];
    const wrapper = shallow(<History history={history} />);
    expect(wrapper.find('tbody').children().length).toBe(3);
    expect(
      wrapper.text().includes('There are currently no history records')
    ).toBeFalsy();
    expect(wrapper.text().includes('name => myAwesomeMeteorite')).toBeTruthy();
    expect(wrapper.text().includes('name => myAwesomeMeteorite2')).toBeTruthy();
    expect(wrapper.text().includes('name => myAwesomeMeteorite3')).toBeTruthy();
    expect(wrapper.text().includes('year => 2011-01-01')).toBeTruthy();
    expect(wrapper.text().includes('year => 2010-01-01')).toBeTruthy();
    expect(wrapper.text().includes('54823')).toBeTruthy();
    expect(
      wrapper.text().includes(
        moment('2020-02-23T22:35:55.099Z')
          .format('MM/DD/YY h:mm a')
          .toString()
      )
    ).toBeTruthy();
  });
});
