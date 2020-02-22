// src/js/store/index.js
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { fetchAllMeteorites } from '../actions';
import { addEditHistoryMiddleware } from '../middleware';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk, addEditHistoryMiddleware))
);

store.dispatch(fetchAllMeteorites());

export default store;
