import * as actions from './actions'

const turns = ['X', 'O'];

const initialState = {
  turn: turns[0]
}

function gameParams(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      return {...initialState, turn: state.turn === initialState.turn ? turns[1] : turns[0]}
    default:
      return initialState;
  }
}

export default gameParams;