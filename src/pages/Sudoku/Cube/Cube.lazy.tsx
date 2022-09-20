import { lazy, Suspense } from 'react';

const LazyCube = lazy(() => import('./Cube'));

const Cube = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCube {...props} />
  </Suspense>
);

export default Cube;
