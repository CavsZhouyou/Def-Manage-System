import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/router/index.tsx';
import './App.scss';

const App = (): JSX.Element => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes></Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
