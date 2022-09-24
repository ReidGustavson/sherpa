import { FC } from 'react'
import { Color, Vector3 } from 'three'
import CubeCube from './CubeCube/CubeCube'
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
  return (
    <SudokuStore gameSize={gameSize} colorIndexes={colorIndexes}>
        <CubeCube 
          colors={colors}
          cubeIndexes={Array.from(Array(Math.pow(gameSize, 3)).keys())}
          position={new Vector3(0,0,0)}/>
    </SudokuStore>
  );
};

export default SudokuGame;