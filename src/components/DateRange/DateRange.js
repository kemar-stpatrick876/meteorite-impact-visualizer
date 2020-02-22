import React, { Component } from 'react';
import Datetime from 'react-datetime';
import './DateRange.scss';
import { formattedDate, isValidDate } from '../../utils';

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

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div className="DateRange">
        <div className="DateRange__field">
          <label htmlFor="startDate">Start Date: </label>
          <Datetime
            dateFormat="YYYY"
            id="startDate"
            value={startDate}
            viewDate={Datetime.moment(startDate)}
            onChange={m => this.onDateFieldChange('startDate', m)}
            closeOnSelect
            isValidDate={isValidDate}
          />
        </div>
        <div className="DateRange__field">
          <label htmlFor="endDate">End Date: </label>
          <Datetime
            dateFormat="YYYY"
            id="endDate"
            value={endDate}
            viewDate={Datetime.moment(endDate)}
            isValidDate={isValidDate}
            closeOnSelect
            onChange={m => this.onDateFieldChange('endDate', m)}
          />
        </div>
      </div>
    );
  }
}
