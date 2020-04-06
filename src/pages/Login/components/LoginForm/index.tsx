/*
 * @Author: zhouyou@werun
 * @Descriptions: 登录表单
 * @TodoList: 无
 * @Date: 2020-03-09 20:47:57
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-18 21:42:04
 */
import React, { memo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginRequest } from '@/service/apis';
import { LoginParams, LoginResponse } from '@/service/types';
import { delay } from '@/utils';
import md5 from 'md5';
import styles from './index.module.scss';

const initialValues = {
  remember: true
};

/**
 * 保存用户数据到 sessionStorage
 */
const saveGlobalData = (data: LoginResponse): void => {
  const {
    userInfo: { userName, userId, userAvatar, role }
  } = data;

  sessionStorage.setItem('userName', userName);
  sessionStorage.setItem('userId', String(userId));
  sessionStorage.setItem('userAvatar', userAvatar);
  sessionStorage.setItem('userRole', role);
};

export default memo(function LoginForm() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submit = useCallback((values): void => {
    const { account, password } = values;
    login({ account, password: md5(password) });
  }, []);

  const login = async (params: LoginParams): Promise<void> => {
    setLoading(true);

    const result = await loginRequest(params);

    if (result.success) {
      message.success('登录成功');

      saveGlobalData(result.data);
      await delay(1000);
      history.push('/home/workBench');
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={initialValues}
        onFinish={submit}
      >
        <div className={styles.title}>DEF 工程研发平台</div>
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入账号!' }]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Button type="link" className={styles.forget}>
            忘记密码
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginButton}
            loading={loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
