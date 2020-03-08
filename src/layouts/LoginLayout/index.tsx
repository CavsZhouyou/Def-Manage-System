import React from 'react';
import { Button } from 'antd';
import { AppState } from '@/store/reducers';
import { loginRequest } from '@/store/login/actions';
import { useSelector, useStore, useDispatch } from 'react-redux';

const LoginLayout = React.memo(
  (): JSX.Element => {
    const status = useSelector((state: AppState) => state.loginReducer.status);
    const store = useStore();
    const dispatch = useDispatch();

    return (
      <div>
        <Button
          type="primary"
          onClick={(): void => {
            dispatch(
              loginRequest({
                username: 'yyc',
                password: '123'
              })
            );
          }}
        >
          登陆
        </Button>
        <div>{JSON.stringify(status)}</div>
      </div>
    );
  }
);

export default LoginLayout;
