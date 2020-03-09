/*
 * @Author: zhouyou@werun
 * @Descriptions: Login 组件
 * @TodoList: 无
 * @Date: 2020-03-09 20:18:19
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 20:54:10
 */
import React from 'react';
import styles from './index.module.scss';
import LoginFrom from './components/LoginForm';

const Login = React.memo(
  (): JSX.Element => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.background}></div>
        <LoginFrom></LoginFrom>
        <div className={styles.footer}>
          Copyright © 2019-现在，淘宝（中国）软件有限公司 版权所有 |
          浙ICP备09109183号-73
        </div>
      </div>
    );
  }
);

export default Login;
