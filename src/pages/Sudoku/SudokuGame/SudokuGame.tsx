import { FC, ReactElement, useState } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import { API } from 'aws-amplify'
import { set_game } from '../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import styles from './SudokuGame.module.scss';

const ApiName = 'sudokuDaily'
const path = '/sudoku/daily'

const SudokuGame: FC = () => {
  const gameSize = useAppSelector((state) => state.sudoku.currentGame.gameSize)
  const cubesDetailsLoaded = useAppSelector((state) => state.sudoku.currentGame.gameDetails.length > 0)
  const dispatch = useAppDispatch()
  const [colors, setColors] = useState<(Color|null)[]>()
  const [loading, setLoading] = useState(false)

  if (gameSize > 0 && colors?.length !== gameSize + 1) {
    assignColors()
  }
  if (loading && cubesDetailsLoaded) {
    setLoading(false)
  }
  if (!loading && !cubesDetailsLoaded) {
    loadGame()
  }

  function assignColors() {
    const choices = ['red', 'blue', 'rgb(0,100,100)', 'rgb(170, 255, 0)','fuchsia'].splice(0, gameSize)
    setColors([...choices.map(x => new Color(x)), null])
  }

  function loadGame() {
    setLoading(true)
    API.get(ApiName, path + '/' + gameSize, {}).then(response => {
      const newGameDetails = response.values.map((x: number, i: number) => {
        return {colorIndex: x, index: i, given: x < (gameSize)}
      })
      dispatch(set_game(newGameDetails))
    })
  }

  function makeCubes(): ReactElement[] {
    const cubeIndexes = getCubeIndexes((gameSize))
    const cubes: JSX.Element[] = []
    for (let i = 0; i < cubeIndexes.length; i++) {
      cubes.push(
        <div key={gameSize + '' + i}>
          <CubeCube
            colors={colors ?? []}
            indexes={cubeIndexes[i]}
            position={new Vector3(0, i*6,0)}
            cubeCubeIndex={i}/>
        </div>
      );
    }
    return cubes
  }

  function shouldRenderGame(): boolean {
    const colorsSet = colors?.length === gameSize + 1
    return cubesDetailsLoaded && colorsSet
  }

  return (
    <div className={styles.SudokuGame}>
      {shouldRenderGame() && makeCubes()}
    </div>
  );
};

export default SudokuGame
