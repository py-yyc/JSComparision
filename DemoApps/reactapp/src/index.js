import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import config from './config';
import createRoutes from './routes';
import createStore from './store';

// Create base Redux structure
const store = createStore();

const browserHistory = useRouterHistory(createHistory)({
  basename: config['routerBasePath']
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(history);

// Create base routes wrapped in Redux store
let rootComponent = (
    <ReduxProvider store={store}>
      {routes}
    </ReduxProvider>
);

// Strip the loading element before rendering.
let loadingElement = document.getElementById('loading');
if (loadingElement !== undefined) {
  loadingElement.parentNode.removeChild(loadingElement);
}

// Render the app
ReactDOM.render(rootComponent, document.getElementById('root'));
