import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import has from 'lodash/has';
import './MapContainer.scss';
import DateRange from '../DateRange/DateRange';
import MeteoriteMap from '../MeteoriteMap/MeteoriteMap';
import { API_ENDPOINT } from '../../constants';
import { formattedDate } from '../../utils';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteoriteImpacts: [],
      dateRange: {
        start: '2010-01-01',
        end: formattedDate()
      }
    };
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  componentDidMount() {
    axios.get(API_ENDPOINT).then(res => {
      const meteoriteImpacts = res.data.filter(
        d => has(d, 'reclong') && has(d, 'reclat')
      );
      console.log(meteoriteImpacts);
      this.setState({ meteoriteImpacts });
    });
  }

  onDateRangeChange(dateRange) {
    this.setState({ dateRange });
  }

  dateRangeSeries(items) {
    const {
      dateRange: { start, end }
    } = this.state;

    return items.filter(item => moment(item.year).isBetween(start, end));
  }

  render() {
    const { meteoriteImpacts, dateRange } = this.state;
    return (
      <div className="MapContainer">
        <div className="MapContainer__header">
          <DateRange
            dateRange={dateRange}
            onDateRangeChange={this.onDateRangeChange}
          />
        </div>
        <MeteoriteMap
          meteoriteImpacts={this.dateRangeSeries(meteoriteImpacts)}
        />
      </div>
    );
  }
}
