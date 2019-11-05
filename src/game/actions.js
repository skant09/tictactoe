export const CHANGE_GAME_STATE = 'game/changeGameState';
export const CHANGE_GAME_SIZE = 'game/changeGameSize';
export const CHECK_GAME_OVER = 'game/checkGameOver';

export const changeGameState = payload => ({
  type: CHANGE_GAME_STATE,
  payload
})

export const checkGameOver = payload => ({
  type: CHECK_GAME_OVER,
  payload
})
// export const changeGameSize = payload => console.log('changeGameSize', payload) || ({
//   type: CHANGE_GAME_SIZE,
//   payload
// })