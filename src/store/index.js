// src/js/store/index.js
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/index';
import { addEditHistoryMiddleware } from '../middleware';

const persistConfig = {
  key: 'meteorites',
  storage
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  storeEnhancers(applyMiddleware(thunk, addEditHistoryMiddleware))
);
export const persistor = persistStore(store);

export default store;
