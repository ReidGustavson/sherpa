export enum ActionTypes {
  CLICK_CUBE
}

export const click_cube = (index: number) => {
  return {
    type: ActionTypes.CLICK_CUBE,
    payload: index
  }
}
