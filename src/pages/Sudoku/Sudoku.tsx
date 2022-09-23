import { FC } from 'react';
import { Canvas }  from '@react-three/fiber';
import { OrbitControls, Stars } from "@react-three/drei";
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import { Color } from 'three';

const Sudoku: FC = () => {
  return (
    <div className={styles.Sudoku}>
      <Canvas camera={{position: [10,10,10], fov: 90}}>
        <OrbitControls/>
        <Stars />
        <ambientLight color={new Color('white')} intensity={1}/>
        <SudokuGame gameSize={3}/>
      </Canvas>
    </div>
  );
};

export default Sudoku;
