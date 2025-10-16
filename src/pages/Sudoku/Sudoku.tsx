import { FC, useEffect, useMemo, useState } from 'react';
import styles from './Sudoku.module.scss';
import SudokuGame from './SudokuGame/SudokuGame.lazy';
import { reset_game, set_game_size } from './Redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SudokuInfo from './SudokuInfo';
import SudokuTitle from './SudokuTitle';

const Sudoku: FC = () => {
  const dispatch = useAppDispatch()
  const gameSize = useAppSelector((state) => state.sudoku.currentGame.gameSize)
  const [viewState, setViewState] = useState<'Game'|'Help'|'About'>('Game')
  
  useEffect(() => {
    document.title = `Sudoku`;
  });

  const game = useMemo(() => <SudokuGame />, [])

  return (
    <div className={styles.Sudoku}>
      <SudokuTitle />
      <div className='game'>
        <div className='game-border'>
          {game}
          {viewState !== 'Game' && <SudokuInfo viewState={viewState} close={() => setViewState('Game')} />}
        </div>
        <div className='menu'>
          <div className='button-group'>
            <label className='button-labels'>Cube Dimensions</label>
            {[3,4,5].map(i => <button className={gameSize === i ? "current" : ""} key={i} onClick={() => dispatch(set_game_size(i)) }>{i}</button>)}
          </div>

          <div className='button-group'>
            <button key='reset' onClick={() => dispatch(reset_game())}>Reset</button>
          </div>

          <div className='button-group'>
            <button key='explain' onClick={()=>setViewState('Help')}>What?!</button>
            <button key='about' onClick={()=>setViewState('About')}>About</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku
