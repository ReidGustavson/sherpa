import { FC, useState } from 'react';
import React from 'react';
import { Color } from 'three';
import CubeCube from '../CubeCube/CubeCube';

const SudokuGameContext = React.createContext({ solved: false });

export class CubeDetails {
  given: boolean
  color: Color | null
  onClick: () => void
  index: number
  constructor(index: number, color: Color | null = null, given = false, onClick: (() => void) | null = null) {
    this.onClick = onClick ?? (() => {return});
    this.color = color
    this.given = given
    this.index = index
  }

  static clone(cubeDetails: CubeDetails) {
    return new CubeDetails(cubeDetails.index, cubeDetails.color, cubeDetails.given, cubeDetails.onClick)
  }
}

interface SudokuGameProps {
  gameSize: number
}

const SudokuGame: FC<SudokuGameProps> = ({gameSize}) => {
  const [solved, setSolved] = useState(false);
  const [colorIndexes, setColorIndexes] = useState([3,1,2,1,2,0,2,0,1,1,2,0,2,0,1,0,1,2,2,0,1,0,1,2,1,2,0]);
  function clickBox(index: number) {
    if (solved) {
      console.log('SOLVED!')
      return
    }
    if (colorIndexes[index] === gameSize && nullIndexes.delete(index)) {
      setNullIndexes(nullIndexes)
    }
    colorIndexes[index] = ++colorIndexes[index]%(gameSize + 1)
    setColorIndexes(colorIndexes)
    cubeDetails[index].color = colors[colorIndexes[index]%(gameSize + 1)]
    setCubeDetails(cubeDetails)
    console.log('STATE UPDATED.... INDEX: ', index, " colorIndex: ", colorIndexes[index])
    if (colorIndexes[index] === gameSize) {
      nullIndexes.add(index)
      setNullIndexes(nullIndexes)
    }
    if (nullIndexes.size === 0) {
      console.log('check For Win...')
      if (checkForWin()) {
        console.log('WIN!')
        setSolved(true)
        console.log(solved);
      }
    }
  }
  
  function checkForWin(): boolean {
    for (let i=0; i < gameSize; i++) {
      for (let j=0; j < gameSize; j++) {
        const row = new Set();
        const column = new Set();
        const depth = new Set();
        for (let k=0; k < gameSize; k++) {
          row.add(colorIndexes[i*gameSize*gameSize + j*gameSize + k])
          column.add(colorIndexes[i*gameSize*gameSize + j + k*gameSize])
          depth.add(colorIndexes[i*gameSize + j + k*gameSize*gameSize])
        }
        for (const dimension of [row, column, depth]) {
          if (dimension.has(gameSize) || dimension.size < gameSize) {
            return false
          }
        }
      }
    }
    return true;
  }

  const colors = [new Color('red'), new Color('blue'), new Color('green'), null]
  const currentNullIndexes = new Set();
  const currentCubeDetails = colorIndexes.map((value, index) => {
    if (value === gameSize) {
      currentNullIndexes.add(index);
      return new CubeDetails(index, null, false, () => clickBox(index));
    }
    return new CubeDetails(index, colors[value], true)
  })
  const [nullIndexes, setNullIndexes] = useState(currentNullIndexes);
  const [cubeDetails, setCubeDetails] = useState(currentCubeDetails);
  return (
    <SudokuGameContext.Provider value={{solved: solved}}>
        <CubeCube detailsForCubes={cubeDetails} gameSize={gameSize}/>
    </SudokuGameContext.Provider>
  );
};

export default SudokuGame;