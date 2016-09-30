import React from 'react';

const { object } = React.PropTypes;

const propTypes = {
  children: object.isRequired,
};

const App = ({ children }) => {
  const pageClass = 'home-page';

  return (
    <div className={`application page ${pageClass}`}>
      {children}
    </div>
  );
};

App.propTypes = propTypes;

export default App;