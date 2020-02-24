import Axios from 'axios';
import has from 'lodash/has';
import { store as notificationStore } from 'react-notifications-component';

import {
  SET_DISPLAY_RANGE,
  FETCH_METEORITE_DATA,
  API_ENDPOINT,
  PUT_METEORITE_DATA,
  ADD_HISTORY_RECORD
} from '../constants';

export function setDisplayRange(payload) {
  const ret = { type: SET_DISPLAY_RANGE, payload };
  console.log(ret);
  return ret;
}

export const fetchMeteorites = meteorites => {
  return {
    type: FETCH_METEORITE_DATA,
    meteorites
  };
};

/**
 * fetch meteorite data from api
 */
export const fetchAllMeteorites = () => {
  return dispatch => {
    return Axios.get(API_ENDPOINT)
      .then(res => {
        notificationStore.addNotification({
          title: 'Success',
          message: 'Data loaded successfully!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        const meteorites = res.data.filter(
          d => has(d, 'reclong') && has(d, 'reclat')
        );
        dispatch(fetchMeteorites(meteorites));
      })
      .catch(error => {
        notificationStore.addNotification({
          title: 'Failure',
          message: 'Failed to load data!',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
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
