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

    <a href='https://www.github.com/ReidGustavson/sherpa/tree/sudoku'>Source Code</a>
    <a href='https://www.linkedin.com/in/reid-g'>Creator LinkedIn</a>
  </div>
);

export default HowItsMade;