/*
 * @Author: zhouyou@werun
 * @Descriptions: 登录表单
 * @TodoList: 无
 * @Date: 2020-03-09 20:47:57
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-11 21:49:23
 */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface Store {
  username?: string;
  password?: string;
  remember?: boolean;
}

const onFinish = (values: Store): void => {
  console.log('Received values of form: ', values);
};

const initialValues: Store = {
  remember: true
};

const LoginForm = React.memo(
  (): JSX.Element => {
    return (
      <div className={styles.formWrapper}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <div className={styles.title}>DEF 工程研发平台</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <a className={styles.forget}>忘记密码</a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
);

export default LoginForm;
