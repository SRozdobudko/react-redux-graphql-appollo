import { reducer as reduxFormReducer } from 'redux-form';
import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
}                               from 'redux';
import { persistState }         from 'redux-devtools';
import { routerReducer }        from 'react-router-redux';
import createLogger             from 'redux-logger';
import thunkMiddleware          from 'redux-thunk';
import * as reducers            from '../modules/reducers';
import DevTools                 from '../devTools/DevTools.jsx';
import { apolloClient }         from '../../services/apollo';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

// createStore : enhancer
const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    apolloClient.middleware(), // apollo middleware
    loggerMiddleware
  ), // logger after thunk to avoid undefined actions
  persistState(getDebugSessionKey()),
  DevTools.instrument()
);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

// combine reducers -> createStore reducer
const reducer = combineReducers({
  ...reducers,
  form: reduxFormReducer,
  apollo: apolloClient.reducer(), // apollo reducer
  routing: routerReducer
});

// export default = "redux store"
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  module.hot.accept('../modules/reducers', () =>
    store.replaceReducer(require('../modules/reducers').default)
  );
  return store;
}

// export "apollo client"
export const client = apolloClient;
