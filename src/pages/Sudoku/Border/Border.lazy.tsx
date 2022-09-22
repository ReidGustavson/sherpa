import React, { lazy, Suspense } from 'react';

const LazyBorder = lazy(() => import('./Border'));

const Border = (props: JSX.IntrinsicAttributes & { solved: boolean, children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBorder {...props} />
  </Suspense>
);

export default Border;
