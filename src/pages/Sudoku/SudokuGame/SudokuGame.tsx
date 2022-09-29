import { connect } from 'react-redux'
import { FC, ReactElement, useState } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import {API} from 'aws-amplify'
import { ActionTypes, set_game } from '../Redux/actions'
import { SudokuGameState } from '../Redux/gameState'

interface SudokuGameProps {
  gameSize?: number
  gameDetails?: CubeDetails[]
  setGame?: (gameDetails: CubeDetails[]) => void
}

export interface CubeDetails {
  index: number
  colorIndex: number
  given: boolean
}

const ApiName = 'sudokuDaily'
const path = '/sudoku/daily'

const SudokuGame: FC<SudokuGameProps> = ({gameSize, gameDetails, setGame}) => {
  console.log('Rerender SudokuGame')
  const [colors, setColors] = useState<(Color|null)[]>()
  const [loading, setLoading] = useState(false)

  if (!!gameSize && colors?.length !== gameSize + 1) {
    assignColors()
  }
  if (loading && !!gameDetails) {
    setLoading(false)
  }
  if (!gameDetails && !loading) {
    loadGame()
  }

  function assignColors() {
    const choices = ['red', 'blue', 'green', 'purple', 'yellow'].splice(0, gameSize)
    setColors([...choices.map(x => new Color(x)), null])
  }

  function loadGame() {
    setLoading(true)
    API.get(ApiName, path + '/' + gameSize, {}).then(response => {
      const newGameDetails = response.values.map((x: number, i: number) => {
        return {colorIndex: x, index: i, given: x < (gameSize ?? 0)}
      })
      if (setGame) {
        console.log('Setting game')
        setGame(newGameDetails)
      }
    })
  }

  function makeCubes(): ReactElement[] {
    const cubeIndexes = getCubeIndexes((gameSize ?? 0))
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
  return (
    <> { !!gameDetails && !!colors && makeCubes()} </>
  );
};

const mapStateToProps: (state: SudokuGameState, ownProps: SudokuGameProps) => unknown = (state, _) => {
  console.log('IN sudokuGame')
  return {
    gameSize: state.gameSize,
    gameDetails: state.gameDetails
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: ActionTypes; payload: unknown}) => unknown) => {
  return { setGame: (gameDetails: CubeDetails[]) => dispatch(set_game(gameDetails))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SudokuGame)
