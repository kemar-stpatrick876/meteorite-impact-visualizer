import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import './MapContainer.scss';
import DateRange from '../../components/DateRange/DateRange';
import MeteoriteMap from '../../components/MeteoriteMap/MeteoriteMap';
import { setDisplayRange, fetchAllMeteorites } from '../../actions';

const mapStateToProps = state => {
  const { displayRange, meteorites } = state;
  return { displayRange, meteorites };
};
const mapDispatchToProps = dispatch => ({
  doSetDisplayRange: dateRange => dispatch(setDisplayRange(dateRange)),
  doFetchAllMeteorites: () => dispatch(fetchAllMeteorites())
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    const {
      displayRange: { start, end }
    } = props;
    this.state = {
      dateRange: {
        start,
        end
      }
    };
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  componentDidMount() {
    const { meteorites, doFetchAllMeteorites } = this.props;
    if (!meteorites) {
      doFetchAllMeteorites();
    }
  }

  onDateRangeChange(dateRange) {
    const { doSetDisplayRange } = this.props;
    doSetDisplayRange({ ...dateRange });
  }

  dateRangeSeries(items) {
    const {
      displayRange: { start, end }
    } = this.props;

    // console.log('date range called ', start, end, this.props);

    return items.filter(item => moment(item.year).isBetween(start, end));
  }

  render() {
    const { dateRange } = this.state;
    const { meteorites = [] } = this.props;
    // console.log('render ', meteorites);
    return (
      <div className="MapContainer">
        <div className="MapContainer__header">
          <DateRange
            dateRange={dateRange}
            onDateRangeChange={this.onDateRangeChange}
          />
        </div>
        <MeteoriteMap meteoriteImpacts={this.dateRangeSeries(meteorites)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
