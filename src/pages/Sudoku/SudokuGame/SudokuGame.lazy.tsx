import React, { lazy, Suspense } from 'react';
import { Color } from 'three';

const LazySudokuGame = lazy(() => import('./SudokuGame'));

const SudokuGame = (props: JSX.IntrinsicAttributes  & 
  { gameSize: number, colorIndexes: number[], colors: (Color|null)[], children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySudokuGame {...props} />
  </Suspense>
);

export default SudokuGame;
