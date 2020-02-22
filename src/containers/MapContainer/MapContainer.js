import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import has from 'lodash/has';
import { connect } from 'react-redux';
import { cacheAdapterEnhancer } from 'axios-extensions';

import './MapContainer.scss';
import DateRange from '../../components/DateRange/DateRange';
import MeteoriteMap from '../../components/MeteoriteMap/MeteoriteMap';
import { API_ENDPOINT } from '../../constants';
import { setDisplayRange } from '../../actions';

const mapStateToProps = state => {
  return { displayRange: state.displayRange };
};
const mapDispatchToProps = dispatch => ({
  doSetDisplayRange: dateRange => dispatch(setDisplayRange(dateRange))
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    const {
      displayRange: { start, end }
    } = props;
    this.state = {
      meteoriteImpacts: [],
      dateRange: {
        start,
        end
      }
    };
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  componentDidMount() {
    axios
      .create({
        adapter: cacheAdapterEnhancer(axios.defaults.adapter)
      })
      .get(API_ENDPOINT)
      .then(res => {
        const meteoriteImpacts = res.data.filter(
          d => has(d, 'reclong') && has(d, 'reclat')
        );
        console.log('get req ', meteoriteImpacts);
        this.setState({ meteoriteImpacts });
      });
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
    const { meteoriteImpacts, dateRange } = this.state;
    console.log('render ', meteoriteImpacts);
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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
