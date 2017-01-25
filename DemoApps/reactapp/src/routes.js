import React, { Component, PureComponent } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

class Error extends Component {
  //noinspection JSMethodCanBeStatic
  render() {
    return <div>Container Loading Error</div>;
  }
}

function loadRouteContainer(routePath, ErrorComponent = Error) {
  return (location, callback) => {
    require('bundle-loader?lazy&name=route-[name]!./containers/' + routePath)(
      module => {
        callback(null, module);
      },
      error => {
        callback(null, ErrorComponent);
      }
    )
  }
}

/*
 * CREATE ROUTES
 *
 * Create all standard routes for the application.
 */
export default function createRoutes(history) {
  return(
    <Router history={history}>
      <Route path="/" getComponent={loadRouteContainer('App')}>
        <IndexRoute getComponent={loadRouteContainer('ToDo')}/>
        <Route path="/request" getComponent={loadRouteContainer('APIRequest')}/>
      </Route>
    </Router>
  );
}