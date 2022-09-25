import { FC } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
import { getCubeIndexes } from './CubeMath'
import SudokuStore from './Redux/store'

interface SudokuGameProps {
  gameSize: number
  colorIndexes: number[]
  colors: (Color | null)[]
}

export interface CubeDetails {
  index: number
  colorIndex: number
  given: boolean
}

const SudokuGame: FC<SudokuGameProps> = ({gameSize, colorIndexes, colors}) => {
  const cubeIndexes = getCubeIndexes(gameSize)
  const cubes: JSX.Element[] = []
  for (let i = 0; i < cubeIndexes.length; i++) {
    cubes.push(
      <CubeCube
        key={i}
        colors={colors}
        cubeIndexes={cubeIndexes[i]}
        position={new Vector3(0, i*3,0)}/>
    );
}
  return (
    <SudokuStore gameSize={gameSize} colorIndexes={colorIndexes}>
      {cubes}
    </SudokuStore>
  );
};

export default SudokuGame;