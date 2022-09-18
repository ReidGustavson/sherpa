import React, { lazy, Suspense } from 'react';

const LazyAuthButton = lazy(() => import('./AuthButton'));

const AuthButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAuthButton {...props} />
  </Suspense>
);

export default AuthButton;
