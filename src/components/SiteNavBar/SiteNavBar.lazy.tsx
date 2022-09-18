import React, { lazy, Suspense } from 'react';

const LazySiteNavBar = lazy(() => import('./SiteNavBar'));

const SiteNavBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySiteNavBar {...props} />
  </Suspense>
);

export default SiteNavBar;
