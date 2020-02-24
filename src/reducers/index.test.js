import rootReducer, { initialState } from './index';
import {
  SET_DISPLAY_RANGE,
  FETCH_METEORITE_DATA,
  MOCK_DATA,
  PUT_METEORITE_DATA,
  ADD_HISTORY_RECORD
} from '../constants';

describe('rootReducer', () => {
  test('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle SET_DISPLAY_RANGE', () => {
    const startAction = {
      type: SET_DISPLAY_RANGE,
      payload: {
        start: '2010-01-01',
        end: '2011-01-01'
      }
    };
    expect(rootReducer({}, startAction)).toEqual({
      displayRange: {
        end: '2011-01-01',
        start: '2010-01-01'
      }
    });
  });
  test('should handle FETCH_METEORITE_DATA', () => {
    const startAction = {
      type: FETCH_METEORITE_DATA,
      meteorites: MOCK_DATA
    };
    expect(rootReducer(undefined, startAction)).toEqual({
      ...initialState,
      meteorites: MOCK_DATA
    });
  });

  test('should handle PUT_METEORITE_DATA', () => {
    const startAction = {
      type: PUT_METEORITE_DATA,
      data: {
        name: 'Aachen changed',
        id: '1'
      }
    };
    expect(
      rootReducer(
        {
          meteorites: MOCK_DATA
        },
        startAction
      )
    ).toEqual({
      meteorites: [
        {
          name: 'Aachen changed',
          id: '1',
          nametype: 'Valid',
          recclass: 'L5',
          mass: '21',
          fall: 'Fell',
          year: '1880-01-01T00:00:00.000',
          reclat: '50.775000',
          reclong: '6.083330',
          geolocation: { type: 'Point', coordinates: [6.08333, 50.775] }
        },
        {
          name: 'Aarhus',
          id: '2',
          nametype: 'Valid',
          recclass: 'H6',
          mass: '720',
          fall: 'Fell',
          year: '1951-01-01T00:00:00.000',
          reclat: '56.183330',
          reclong: '10.233330',
          geolocation: { type: 'Point', coordinates: [10.23333, 56.18333] }
        }
      ]
    });
  });
  test('should handle ADD_HISTORY_RECORD', () => {
    const startAction = {
      type: ADD_HISTORY_RECORD,
      data: {
        timestamp: '2020-02-23T22:30:46.348Z',
        id: '53829',
        original: 'myAwesomeMeteorite',
        updated: 'myAwesomeMeteorite2',
        field: 'name'
      }
    };
    expect(
      rootReducer(
        {
          history: []
        },
        startAction
      )
    ).toEqual({
      history: [
        {
          timestamp: '2020-02-23T22:30:46.348Z',
          id: '53829',
          original: 'myAwesomeMeteorite',
          updated: 'myAwesomeMeteorite2',
          field: 'name'
        }
      ]
    });
  });
});
