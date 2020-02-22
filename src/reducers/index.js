import { formattedDate } from '../utils';
import { SET_DISPLAY_RANGE } from '../constants';

const initialState = {
  displayRange: {
    start: '2010-01-01',
    end: formattedDate()
  }
};

function rootReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_DISPLAY_RANGE: {
      const {
        payload: { start, end }
      } = action;
      console.log('in reduce ', action, start, end);
      return { ...state, displayRange: { start, end } };
    }

    default:
      return state;
  }
}

export default rootReducer;
