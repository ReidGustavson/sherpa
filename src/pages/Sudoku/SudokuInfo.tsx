import HowItsMade from "./HowItsMade";
import GameExplainer from "./GameExplainer";
import styles from "./SudokuInfo.module.scss"

type SudokuInfoProps = {
    viewState: 'Game'|'About'|'Help',
    close: () => void
}

const SudokuInfo = ({viewState, close}: SudokuInfoProps) => {
    return (
    <div className={styles.SudokuInfo}>
        <button onClick={() => close()}>x</button>
        {viewState === "Help" && <GameExplainer />}
        {viewState === "About" && <HowItsMade />}
    </div>
    )

}

export default SudokuInfo;