import React, { lazy, Suspense } from 'react';

const LazySidenav = lazy(() => import('./Sidenav'));

const Sidenav = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySidenav {...props} />
  </Suspense>
);

export default Sidenav;
