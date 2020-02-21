import React, { Component } from 'react';
import './DateRange.scss';

const formattedDate = d => {
  const date = d ? new Date(d) : new Date();
  return date.toISOString().split('T')[0];
};

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '2010-01-01',
      endDate: formattedDate()
    };
    this.onDateFieldChange = this.onDateFieldChange.bind(this);
  }

  onDateFieldChange(e) {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
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
