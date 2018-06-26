import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


import AuthWrapper from './components/AuthWrapper';
import reducers from './reducers';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AuthWrapper />
      </PersistGate>
  </Provider>
  , document.querySelector('#app'));
