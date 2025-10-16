import { FC, useEffect } from 'react';
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import { reset_game, set_game_size } from './Redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';

const Sudoku: FC = () => {
  const dispatch = useAppDispatch()
  const gameSize = useAppSelector((state) => state.sudoku.currentGame.gameSize)
  
  useEffect(() => {
    document.title = `Sudoku`;
  });

  return (
    <div className={styles.Sudoku}>
      <div className="title">
          <text className="S">S</text>
          <text className="U">U</text>
          <text className="D">D</text>
          <text className="O">O</text>
          <text className="K">K</text>
          <text className="U2">U</text>
          <text>{" "}</text>
          <text className="3">3</text>
          <text className="D2">D</text>
        </div>
      <div className='game'>
        <div className='game-border'>
          <SudokuGame/>
        </div>
        <div className='buttons'>
          <div className='button-group'>
            <label className='button-labels'>Cube Dimensions</label>
            {[3,4,5].map(i => <button className={gameSize === i ? "current" : ""} key={i} onClick={() => dispatch(set_game_size(i)) }>{i}</button>)}
            <button key='reset' onClick={() => dispatch(reset_game())}>Reset</button>
          </div>

          <div className='button-group'>
            <button key='explain'><Link to='/help'>What?!</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku
