import { formattedDate } from '../utils';
import {
  SET_DISPLAY_RANGE,
  FETCH_METEORITE_DATA,
  PUT_METEORITE_DATA,
  ADD_HISTORY_RECORD
} from '../constants';

export const initialState = {
  displayRange: {
    start: '2010-01-01',
    end: formattedDate()
  },
  history: [],
  displayedMeteorites: []
};

function rootReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_DISPLAY_RANGE: {
      const {
        payload: { start, end }
      } = action;
      return { ...state, displayRange: { start, end } };
    }
    case FETCH_METEORITE_DATA: {
      const { meteorites } = action;
      return { ...state, meteorites };
    }
    case PUT_METEORITE_DATA: {
      let { meteorites } = state;
      const { data } = action;
      meteorites = meteorites.map(meteorite => {
        if (meteorite.id !== data.id) return meteorite;
        return { ...meteorite, ...data };
      });
      const ret = { ...state, meteorites };

      return ret;
    }

    case ADD_HISTORY_RECORD: {
      const { data } = action;
      const { history } = state;

      return { ...state, history: [...history, data] };
    }
    default:
      return state;
  }
}

export default rootReducer;
