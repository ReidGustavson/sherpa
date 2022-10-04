import styles from './GameExplainer.module.scss';
const GameExplainer = () =>(
  <div className={styles.GameExplainer}>
    <h2>Sudoku3D</h2>
    <a href="/" style={{float:"right"}}><button>X</button></a>
    <ul>
      <li>{"Goal: Put exactly one cube of each color on every row, column, and depth."}</li>
      <li>{"How To Change Colors: Click on the missing gaps to rotate through the colors."}</li>
      <li>{"How to rotate the cube: click and drag the space around the cubes."}</li>
      <li>{"How to fill the center: The lower cubes are duplicates of the inner cubes."}</li>
      <li>{"When: There are new puzzles daily."}</li>
      <li>{"Game Size: The buttons 3/4/5 refer to the number of colors in each level."}</li>
      <li>{"Note: The cubes you assign are more transparent than the given ones."}</li>
    </ul>
  </div>
);

export default GameExplainer;
