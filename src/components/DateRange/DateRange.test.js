import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import DateRange from './DateRange';

Enzyme.configure({ adapter: new Adapter() });

describe('Date Range Component', () => {
  const initialVal = { start: '2010-01-01', end: '2020-01-01' };
  const mockOnDateRangeChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', () => {
    const wrapper = shallow(<DateRange dateRange={initialVal} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should have initial values ', () => {
    const wrapper = shallow(<DateRange dateRange={initialVal} />);
    expect(wrapper.find('#startDate').props().value).toBe(initialVal.start);
    expect(wrapper.find('#endDate').props().value).toBe(initialVal.end);
  });

  test('should change start date value', () => {
    const wrapper = shallow(
      <DateRange
        dateRange={initialVal}
        onDateRangeChange={mockOnDateRangeChange}
      />
    );
    wrapper.find('#startDate').simulate('change', moment('2011-01-01'));
    expect(mockOnDateRangeChange.mock.calls.length).toBe(1);
    expect(mockOnDateRangeChange.mock.calls[0][0]).toEqual({
      end: initialVal.end,
      start: '2011-01-01'
    });
  });

  test('should change end date value', () => {
    const wrapper = shallow(
      <DateRange
        dateRange={initialVal}
        onDateRangeChange={mockOnDateRangeChange}
      />
    );
    wrapper.find('#endDate').simulate('change', moment('2019-01-01'));
    expect(mockOnDateRangeChange.mock.calls.length).toBe(1);
    expect(mockOnDateRangeChange.mock.calls[0][0]).toEqual({
      end: '2019-01-01',
      start: initialVal.start
    });
  });

  describe('validate year options', () => {
    let isValidDate;
    beforeEach(() => {
      const wrapper = shallow(
        <DateRange
          dateRange={initialVal}
          onDateRangeChange={mockOnDateRangeChange}
        />
      );
      isValidDate = wrapper.instance().isValidDate;
    });
    test('should not be able to select future years', () => {
      expect(isValidDate(moment().add(2, 'years'), 'startDate')).toBeFalsy();
      expect(isValidDate(moment().add(2, 'years'), 'endDate')).toBeFalsy();
      expect(
        isValidDate(moment().subtract(2, 'years'), 'startDate')
      ).toBeTruthy();
    });

    test('should not be able to select a start date that is after end date', () => {
      expect(
        isValidDate(moment(initialVal.end).add(1, 'years'), 'startDate')
      ).toBeFalsy();
    });

    test('should not be able to select a end date that is before start date', () => {
      expect(
        isValidDate(moment(initialVal.start).subtract(1, 'years'), 'endDate')
      ).toBeFalsy();
    });
  });
});
