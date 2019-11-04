export const CHANGE_GAME_STATE = 'game/changeGameState';
export const CHANGE_GAME_SIZE = 'game/changeGameSize';

export const changeGameState = payload => ({
  type: CHANGE_GAME_STATE,
  payload
})
// export const changeGameSize = payload => console.log('changeGameSize', payload) || ({
//   type: CHANGE_GAME_SIZE,
//   payload
// })