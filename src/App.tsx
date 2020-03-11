import React, { Suspense } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@/router/index.tsx';

const App = (): JSX.Element => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Suspense fallback={null}>{renderRoutes(routes)}</Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;
