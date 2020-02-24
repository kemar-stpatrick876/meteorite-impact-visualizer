import { setDisplayRange, fetchMeteorites, putMeteoriteData } from './index';
import {
  SET_DISPLAY_RANGE,
  FETCH_METEORITE_DATA,
  MOCK_DATA,
  PUT_METEORITE_DATA
} from '../constants';

describe('actions', () => {
  test('setDisplayRange ', () => {
    const payload = { payload: { start: '2015-01-01', end: '2020-01-01' } };
    expect(setDisplayRange(payload)).toStrictEqual({
      type: SET_DISPLAY_RANGE,
      payload: { payload: { start: '2015-01-01', end: '2020-01-01' } }
    });
  });

  test('fetchMeteorites ', () => {
    const meteorites = { meteorites: MOCK_DATA };
    expect(fetchMeteorites(meteorites)).toStrictEqual({
      type: FETCH_METEORITE_DATA,
      meteorites: { meteorites: MOCK_DATA }
    });
  });

  test('putMeteoriteData ', () => {
    const data = MOCK_DATA[0];
    expect(putMeteoriteData(data)).toStrictEqual({
      type: PUT_METEORITE_DATA,
      data
    });
  });
});
