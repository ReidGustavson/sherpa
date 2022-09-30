import { FC, ReactElement, useState } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import {API} from 'aws-amplify'
import { set_game } from '../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

export interface CubeDetails {
  index: number
  colorIndex: number
  given: boolean
}

const ApiName = 'sudokuDaily'
const path = '/sudoku/daily'

const SudokuGame: FC = () => {
  console.log('Rerender SudokuGame')
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
    const choices = ['red', 'blue', 'green', 'purple', 'yellow'].splice(0, gameSize)
    setColors([...choices.map(x => new Color(x)), null])
  }

  function loadGame() {
    console.log('Loading')
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
        <CubeCube
          key={i}
          colors={colors ?? []}
          indexes={cubeIndexes[i]}
          position={new Vector3(0, i*6,0)}/>
      );
    }
    return cubes
  }

  function shouldRenderGame(): boolean {
    const colorsSet = colors?.length === gameSize + 1
    return cubesDetailsLoaded && colorsSet
  }
  return (
    <>{shouldRenderGame() && makeCubes()}</>
  );
};

export default SudokuGame
