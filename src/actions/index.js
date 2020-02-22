import Axios from 'axios';
import has from 'lodash/has';
import {
  SET_DISPLAY_RANGE,
  FETCH_METEORITE_DATA,
  API_ENDPOINT,
  PUT_METEORITE_DATA,
  ADD_HISTORY_RECORD
} from '../constants';

export function setDisplayRange(payload) {
  return { type: SET_DISPLAY_RANGE, payload };
}

export const fetchMeteorites = meteorites => {
  return {
    type: FETCH_METEORITE_DATA,
    meteorites
  };
};

export const fetchAllMeteorites = () => {
  return dispatch => {
    return Axios.get(API_ENDPOINT)
      .then(res => {
        const meteorites = res.data.filter(
          d => has(d, 'reclong') && has(d, 'reclat')
        );
        dispatch(fetchMeteorites(meteorites));
      })
      .catch(error => {
        throw error;
      });
  };
};

export function putMeteoriteData(data) {
  return { type: PUT_METEORITE_DATA, data };
}

export function addHistoryRecord(data) {
  return { type: ADD_HISTORY_RECORD, data };
}
