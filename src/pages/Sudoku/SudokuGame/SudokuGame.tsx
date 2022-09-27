import { FC, ReactElement, useState } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import SudokuStore from './Redux/store'
import Amplify, {API} from 'aws-amplify';

interface SudokuGameProps {
  gameSize: number
}

export interface CubeDetails {
  index: number
  colorIndex: number
  given: boolean
}

const ApiName = 'sherpaadf843aa'
const path = '/sudoku/daily-puzzle'

const SudokuGame: FC<SudokuGameProps> = ({gameSize}) => {
  const [colors, setColors] = useState<(Color|null)[]>()
  const [game, setGame] = useState<number[]>()
  const [loading, setLoading] = useState(false)

  if (!colors) {
    assignColors()
  }
  if (loading && !!game) {
    setLoading(false)
  }
  if (!game && !loading) {
    loadGame()
  }

  function assignColors() {
    const choices = ['red', 'blue', 'green', 'purple', 'yellow'].splice(0, gameSize)
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
    }
    setColors([...choices.map(x => new Color(x)), null])
  }

  function loadGame() {
    API.get(ApiName, path + '/' + gameSize, {}).then(response => {
      setGame(response)
    })
    setLoading(true)
  }

  function makeCubes(): ReactElement[] {
    const cubeIndexes = getCubeIndexes(gameSize)
    const cubes: JSX.Element[] = []
    for (let i = 0; i < cubeIndexes.length; i++) {
      cubes.push(
        <CubeCube
          key={i}
          colors={colors ?? []}
          cubeIndexes={cubeIndexes[i]}
          position={new Vector3(0, i*3,0)}/>
      );
    }
    return cubes
  }
  return (
    <>
    { !!game && !!colors && <SudokuStore gameSize={gameSize} colorIndexes={game}>
      {makeCubes()}
    </SudokuStore>
    }
    </>
  );
};

export default SudokuGame;