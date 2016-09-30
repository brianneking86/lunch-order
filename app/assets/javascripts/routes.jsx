// routes.jsx
import React from 'react';
import Router from 'react-router';
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

import HomePage from './components/home-page.jsx';

module.exports = (
  <Route name="app" path="/" handler={HomePage}>
    <DefaultRoute handler={HomePage} />
  </Route>
);