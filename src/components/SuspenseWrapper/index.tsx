import React, { Suspense } from 'react';

const SuspenseWrapper: Function = (
  Component: React.ComponentType
): Function => {
  return (props: object): JSX.Element => {
    return (
      <Suspense fallback={null}>
        <Component {...props}></Component>
      </Suspense>
    );
  };
};

export default SuspenseWrapper;
