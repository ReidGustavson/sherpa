import { FC, useState } from 'react';
import React from 'react';
import { Color } from 'three';
import CubeCube from '../CubeCube/CubeCube';

const SudokuGameContext = React.createContext({ solved: false });

export class CubeDetails {
  given: boolean
  color: Color | null
  onClick: () => void
  constructor(color: Color | null = null, given = false, onClick: (() => void) | null = null) {
    this.onClick = onClick ?? (() => {return});
    this.color = color
    this.given = given
  }
}

interface SudokuGameProps {
  gameSize: number
}

const SudokuGame: FC<SudokuGameProps> = ({gameSize}) => {
  const [solved, setSolved] = useState(false);
  const [colorIndexes, setColorIndexes] = useState([0,1,2,3,2,0,2,1,0,1,2,0,3,1,0,0,1,2,3,1,0,0,1,2,1,2,0]);
  function clickBox(index: number) {
    if (solved) {
      return
    }
    if (colorIndexes[index] === gameSize && voidIndexes.delete(index)) {
      setVoidIndexes(new Set(voidIndexes));
    }
    colorIndexes[index] = ++colorIndexes[index]%(gameSize + 1)
    setColorIndexes(colorIndexes)
    if (colorIndexes[index] === gameSize) {
      setVoidIndexes(new Set(voidIndexes.add(index)))
    }
    if (voidIndexes.size === 0) {
      if (checkForWin()) {
        setSolved(true)
      }
    }
  }

  function checkForWin(): boolean {
    for (let i=0; i < gameSize * gameSize; i++) {
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
          if (dimension.has(gameSize) || dimension.entries.length < gameSize) {
            return false
          }
        }
      }
    }
    return true;
  }

  const colors = [new Color('blue'), new Color('green'), new Color('yellow'), null]
  const currentVoidIndexes = new Set();
  const cubeDetails = colorIndexes.map((value, index) => {
    if (!value) {
      currentVoidIndexes.add(index);
      return new CubeDetails();
    }
    return new CubeDetails(colors[colorIndexes[value]], true, () => clickBox(index))
  })
  const [voidIndexes, setVoidIndexes] = useState(currentVoidIndexes);
  return (
    <SudokuGameContext.Provider value={{solved: solved}}>
        <CubeCube detailsForCubes={cubeDetails} gameSize={gameSize}/>
    </SudokuGameContext.Provider>
  );
};

export default SudokuGame;