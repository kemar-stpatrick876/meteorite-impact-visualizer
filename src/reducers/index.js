import { formattedDate } from '../utils';
import { SET_DISPLAY_RANGE, FETCH_METEORITE_DATA } from '../constants';

const initialState = {
  displayRange: {
    start: '2010-01-01',
    end: formattedDate()
  },
  history: []
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
    default:
      return state;
  }
}

export default rootReducer;
