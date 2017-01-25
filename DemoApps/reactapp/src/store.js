import Immutable from 'immutable';
import { createStore as createReduxStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createResponsiveStateReducer, createResponsiveStoreEnhancer } from 'redux-responsive';
import { routerReducer as routing } from 'react-router-redux';
import reducers from './reducers';

const baseMiddleware = [
  thunk
];

let devMiddleware = [];

if (process.env.NODE_ENV !== 'production') {
  devMiddleware = [
    createLogger({
      collapsed: true,
      stateTransformer: (state) => {
        const newState = {};
        for (let key of Object.keys(state)) {
          newState[key] = Immutable.Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
        }
        return newState;
      }
    })
  ];
}

/*
 * RESPONSIVE BREAKPOINTS
 *
 * These are derived from Bootstrap's breakpoint such that small, medium, and large match the CSS for Bootstrap.
 * http://getbootstrap.com/css/#grid-options
 *
 * Extra small and extra large, which are only in redux-responsive, are based on the redux-responsive defaults.
 */
let responsiveReducer = createResponsiveStateReducer({
  extraSmall: 480,
  small: 768,
  medium: 992,
  large: 1200,
  extraLarge: 1400
});

/*
 * CREATE STORE
 *
 * Create the main Redux store the application.
 */
export default function createStore(initialState = {}) {

  let finalCreateStore = compose(
      createResponsiveStoreEnhancer(),
      applyMiddleware(...baseMiddleware, ...devMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f  // Allow Redux browser plugin to work
  )(createReduxStore);

  const reducer = combineReducers({
    routing,
    responsive: responsiveReducer,
    ...reducers
  });

  const store = finalCreateStore(reducer, initialState);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducers = require('./reducers');
        const nextRootReducer = combineReducers({
          routing,
          responsive: responsiveReducer,
          ...nextReducers
        });
        store.replaceReducer(nextRootReducer);
      })
    }
  }

  return store;
};
