import React, { lazy, Suspense } from 'react';

const LazySudoku = lazy(() => import('./Sudoku'));

const Sudoku = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySudoku {...props} />
  </Suspense>
);

export default Sudoku;
