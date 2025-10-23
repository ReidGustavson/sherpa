import styles from './SudokuTitle.module.scss';

const SudokuTitle =() => {
    return (
        <div className={styles.Title}>
          <span className="S">S</span>
          <span className="U">U</span>
          <span className="D">D</span>
          <span className="O">O</span>
          <span className="K">K</span>
          <span className="U2">U</span>
          <span>{" "}</span>
          <span className="Num3">3</span>
          <span className="D2">D</span>
        </div>
    )
}

export default SudokuTitle;