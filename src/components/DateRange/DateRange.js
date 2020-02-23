import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import './DateRange.scss';
import { formattedDate } from '../../utils';

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    const {
      dateRange: { start, end }
    } = props;
    this.state = {
      startDate: start,
      endDate: end
    };
    this.onDateFieldChange = this.onDateFieldChange.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onDateFieldChange(id, momentDate) {
    const d = new Date(momentDate.toDate().getFullYear(), 0, 1);

    this.setState({ [id]: formattedDate(d) }, () => {
      const { onDateRangeChange } = this.props;
      const { startDate, endDate } = this.state;
      onDateRangeChange({
        start: startDate,
        end: endDate
      });
    });
  }

  onKeyDown = e => {
    e.preventDefault();
  };

  isValidDate(currentDate, id) {
    const { startDate, endDate } = this.state;
    if (id === 'startDate') {
      return (
        moment(currentDate).isBefore(moment(endDate), 'year') &&
        moment(currentDate).isSameOrBefore(new Date(), 'year')
      );
    }
    return (
      moment(currentDate).isAfter(moment(startDate), 'year') &&
      moment(currentDate).isSameOrBefore(new Date(), 'year')
    );
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div className="DateRange">
        <div className="DateRange__field">
          {/* <label htmlFor="startDate">Start Date: </label> */}
          <i className="material-icons">calendar_today</i>
          <Datetime
            dateFormat="YYYY"
            id="startDate"
            value={startDate}
            viewDate={Datetime.moment(startDate)}
            onChange={m => this.onDateFieldChange('startDate', m)}
            inputProps={{ onKeyDown: this.onKeyDown }}
            closeOnSelect
            closeOnTab
            isValidDate={currentDate =>
              this.isValidDate(currentDate, 'startDate')
            }
          />
        </div>
        <div className="DateRange__field">
          {/* <label htmlFor="endDate">End Date: </label> */}
          <i className="material-icons">calendar_today</i>
          <Datetime
            dateFormat="YYYY"
            id="endDate"
            value={endDate}
            viewDate={Datetime.moment(endDate)}
            isValidDate={currentDate =>
              this.isValidDate(currentDate, 'endDate')
            }
            inputProps={{ onKeyDown: this.onKeyDown }}
            closeOnSelect
            closeOnTab
            onChange={m => this.onDateFieldChange('endDate', m)}
          />
        </div>
      </div>
    );
  }
}
