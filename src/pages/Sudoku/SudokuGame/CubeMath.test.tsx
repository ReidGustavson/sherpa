import { getCubeIndexes, checkForSolve } from './CubeMath';

describe('Cube Math', () => {
  describe('GetCubeIndexes ', () => {
    test('Size 3', () => {
      const cubes = getCubeIndexes(3)
      expect(cubes.length).toBe(2)
      expect(cubes[1]).toStrictEqual([13])
    });

    test('Size 4', () => {
      const cubes = getCubeIndexes(4)
      expect(cubes.length).toBe(2)
      expect(cubes[1]).toStrictEqual([21,22,25,26,37,38,41,42])
    });

    test('Size 5', () => {
      const cubes = getCubeIndexes(5)
      expect(cubes.length).toBe(3)
      expect(cubes[2]).toStrictEqual([62])
    });
  })

  describe('checkForSolve', () => {
    test('Size 2 solved', () => {
      expect(checkForSolve([0,1,1,0,1,0,0,1])).toBeTruthy()
    });
    test('Size 2 unsolved with null', () => {
      expect(checkForSolve([0,1,1,0,1,0,0,2])).toBeFalsy()
    });
    test('Size 2 unsolved wrong', () => {
      expect(checkForSolve([0,1,1,0,1,0,1,0])).toBeFalsy()
    });
    test('Size 3 solved', () => {
      expect(checkForSolve([0,1,2,1,2,0,2,0,1,1,2,0,2,0,1,0,1,2,2,0,1,0,1,2,1,2,0])).toBeTruthy()
    });
    test('Size 3 unsolved with null', () => {
      expect(checkForSolve([3,3,3,1,2,0,2,0,1,1,2,0,2,0,1,0,1,2,2,0,1,0,1,2,1,2,0])).toBeFalsy()
    });
    test('Size 3 unsolved wrong', () => {
      expect(checkForSolve([0,2,1,1,2,0,2,0,1,1,2,0,2,0,1,0,1,2,2,0,1,0,1,2,1,2,0])).toBeFalsy()
    });
  })
});