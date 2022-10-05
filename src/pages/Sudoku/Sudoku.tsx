import { FC, useEffect } from 'react';
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import { reset_game, set_game_size } from './Redux/actions';
import { useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';

const Sudoku: FC = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    document.title = `Sudoku`;
  });

  return (
    <div className={styles.Sudoku}>
      <div className='button-group'>
        {[3,4,5].map(i => <button key={i} onClick={() => dispatch(set_game_size(i)) }>{i}</button>)}
        <button key='reset' onClick={() => dispatch(reset_game())}>Reset</button>
        <button key='explain'><Link to='/help'>Help!</Link></button>
      </div>
      <SudokuGame/>
    </div>
  );
};

export default Sudoku
