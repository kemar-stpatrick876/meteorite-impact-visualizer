import find from 'lodash/find';
import forOwn from 'lodash/forOwn';
import { PUT_METEORITE_DATA } from '../constants';
import { addHistoryRecord } from '../actions';

/**
 * Add history records when meteorite data is updated in state
 * @param {*} param0
 */
export const addEditHistoryMiddleware = ({ dispatch, getState }) => {
  return next => {
    return action => {
      const { type } = action;
      if (type === PUT_METEORITE_DATA) {
        const { data } = action;
        const dataCp = { ...data };
        const { id } = dataCp;
        const current = find(getState().meteorites, ['id', id]);

        delete dataCp.id;

        forOwn(dataCp, (value, key) => {
          const record = {
            timestamp: new Date(),
            id,
            original: current[key],
            updated: value,
            field: key
          };
          console.log(addHistoryRecord(record));

          dispatch(addHistoryRecord(record));
        });
      }
      return next(action);
    };
  };
};
