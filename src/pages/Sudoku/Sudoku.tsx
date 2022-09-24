import { FC, useEffect } from 'react';
import { Canvas }  from '@react-three/fiber';
import { OrbitControls, Stars } from "@react-three/drei";
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import { Color } from 'three';

const Sudoku: FC = () => {
  useEffect(() => {
    document.title = `Sudoku`;
  });
  return (
    <div className={styles.Sudoku}>
      <Canvas camera={{position: [10,10,10], fov: 90}}>
        <OrbitControls/>
        <Stars />
        <ambientLight color={new Color('white')} intensity={1}/>
        <SudokuGame 
          gameSize={3} 
          colorIndexes={[3,3,3,1,2,0,2,0,1,1,2,0,2,0,1,0,1,2,2,0,1,0,1,2,1,2,0]}
          colors={[new Color('red'), new Color('blue'), new Color('green'), null]}/>
      </Canvas>
    </div>
  );
};

export default Sudoku;
