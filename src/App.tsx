import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@/router';

const App = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={null}>{renderRoutes(routes)}</Suspense>
    </Router>
  );
};

export default App;
