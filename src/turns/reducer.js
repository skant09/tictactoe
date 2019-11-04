import * as actions from './actions'

const turns = ['X', 'O'];
const initialState = {
  turnNumber: 0,
  turn: turns[0]
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      if(state === 'X'){
        return 'O';
      } 
      return 'X';
    default:
      return state;
  }
}

export default reducer;