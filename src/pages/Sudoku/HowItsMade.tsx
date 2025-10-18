import styles from "./SudokuInfo.module.scss";

const HowItsMade = () =>(
  <div className={styles.flexdown}>
    <h2>{"Tech Details"}</h2>
    <ul>
      <li>{"Frontend: React"}</li>
      <li>{"Backend: Nodejs"}</li>
      <li>{"Hosting: AWS amplify"}</li>
      <li>{"Graphics: Threejs"}</li>
    </ul>

    <a href='https://www.github.com/ReidGustavson/sherpa/tree/sudoku' target="_blank" rel="noopener noreferrer">Source Code</a>
    <a href='https://www.linkedin.com/in/reid-g' target="_blank" rel="noopener noreferrer">Creator LinkedIn</a>
  </div>
);

export default HowItsMade;