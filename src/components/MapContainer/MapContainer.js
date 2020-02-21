import React, { Component } from 'react';
import './MapContainer.scss';
import DateRange from '../DateRange/DateRange';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="MapContainer">
        <div className="MapContainer__header">
          <DateRange />
        </div>
      </div>
    );
  }
}
