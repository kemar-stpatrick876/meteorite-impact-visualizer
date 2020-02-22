import React, { Component } from 'react';
import './DateRange.scss';

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

  onDateFieldChange(e) {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value }, () => {
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
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={this.onDateFieldChange}
          />
        </div>
        <div className="DateRange__field">
          <label htmlFor="endDate">End Date: </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={this.onDateFieldChange}
          />
        </div>
      </div>
    );
  }
}
