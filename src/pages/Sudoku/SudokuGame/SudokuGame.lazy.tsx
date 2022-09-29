import React, { lazy, Suspense } from 'react';

const LazySudokuGame = lazy(() => import('./SudokuGame'));

const SudokuGame = (props: JSX.IntrinsicAttributes  & {children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySudokuGame {...props} />
  </Suspense>
);

export default SudokuGame;
