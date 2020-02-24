import { addEditHistoryMiddleware } from './index';
import { PUT_METEORITE_DATA, MOCK_DATA } from '../constants';

describe('middlewares', () => {
  it('should add history record on PUT_METEORITE_DATA action call', () => {
    const nextArgs = [];
    const fakeDispatch = jest.fn();
    const fakeGetState = jest.fn();
    fakeGetState.mockReturnValueOnce({ meteorites: MOCK_DATA });

    const fakeNext = (...args) => {
      nextArgs.push(args);
    };
    const fakeStore = {
      dispatch: fakeDispatch,
      getState: fakeGetState
    };

    const action = {
      type: PUT_METEORITE_DATA,
      data: {
        name: 'Aachen changed',
        id: '1'
      }
    };
    addEditHistoryMiddleware(fakeStore)(fakeNext)(action);
    expect(fakeDispatch.mock.calls.length).toBe(1);
    expect(fakeDispatch.mock.calls[0][0]).toMatchObject({
      type: 'ADD_HISTORY_RECORD',
      data: {
        id: '1',
        original: 'Aachen',
        updated: 'Aachen changed',
        field: 'name'
      }
    });
  });
});
