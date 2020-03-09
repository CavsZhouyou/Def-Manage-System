import React from 'react';
import Login from '@/pages/Login';

const LoginLayout = React.memo(
  (): JSX.Element => {
    return (
      <div className="login-layout">
        <Login />
      </div>
    );
  }
);

export default LoginLayout;
