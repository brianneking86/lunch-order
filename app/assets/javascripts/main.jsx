// Webpack config bundles all css, so this is the css entry
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />, 
  document.getElementById('body-container')
);