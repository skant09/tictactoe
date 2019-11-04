const initGameState = [
  [1,0,1],
  [1,1,1],
  [0,0,2]
];

function gameState(state = initGameState, action) {
  switch (action.type) {
    default:
      return initGameState
  }
}

export default gameState;