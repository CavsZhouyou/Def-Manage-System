import React, { Suspense } from 'react';
import { Spin } from 'antd';

const SuspenseWrapper: Function = (
  Component: React.ComponentType
): Function => {
  return (props: object): JSX.Element => {
    return (
      <Suspense
        fallback={
          <div className="example">
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
