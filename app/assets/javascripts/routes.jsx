// routes.jsx
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ReactRouter from 'react-router';

import App from './components/app';
import IndexPage from './components/index-page';

let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
  </Route>
);

export default routes;