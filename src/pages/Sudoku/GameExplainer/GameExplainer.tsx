import { Link } from 'react-router-dom';
import styles from './GameExplainer.module.scss';
const GameExplainer = () =>(
  <div className={styles.GameExplainer}>
    <h2>Sudoku3D</h2>
    <Link to="/" style={{float:"right"}}><button>X</button></Link>
    <ul>
      <li>{"Goal: Put exactly one cube of each color on every row, column, and depth."}</li>
      <li>{"How To Change Colors: Click on the missing spaces to rotate through the colors."}</li>
      <li>{"How to rotate the cube: Click and drag."}</li>
      <li>{"How to fill the center: The lower cubes are duplicates of the nested cubes."}</li>
      <li>{"When: There are new puzzles daily."}</li>
      <li>{"Game Size: The buttons 3/4/5 refer to the number of colors in each level."}</li>
      <li>{"Note: The cubes you assign are more transparent than the given ones."}</li>
    </ul>
  </div>
);

export default GameExplainer;
