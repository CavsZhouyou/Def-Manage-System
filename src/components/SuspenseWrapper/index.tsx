import React, { Suspense } from 'react';
import { Spin } from 'antd';
import styles from './index.module.scss';

const SuspenseWrapper: Function = (
  Component: React.ComponentType
): Function => {
  return (props: object): JSX.Element => {
    return (
      <Suspense
        fallback={
          <div className={styles.suspenseWrapper}>
            <Spin />
          </div>
        }
      >
        <Component {...props}></Component>
      </Suspense>
    );
  };
};

export default SuspenseWrapper;
