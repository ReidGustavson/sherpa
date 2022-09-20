import { FC } from 'react';
import styles from './Sudoku.module.scss';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube/Cube.lazy';

const Sudoku: FC = () => (
  <div className={styles.Sudoku} data-testid="Sudoku">
    <Canvas style={{ background: "#800080" }}>
      <Cube/>
    </Canvas>
  </div>
)

export default Sudoku;
