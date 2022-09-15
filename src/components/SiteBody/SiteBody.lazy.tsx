import React, { lazy, Suspense } from 'react';

const LazySiteBody = lazy(() => import('./SiteBody'));

const SiteBody = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySiteBody {...props} />
  </Suspense>
);

export default SiteBody;
