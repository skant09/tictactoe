import * as actions from './actions'

const turns = ['X', 'O'];
const initialState = {
  turnNumber: 0,
  turn: turns[0]
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      console.log(action);
      ++state.turnNumber;
      if(action.payload.turn === 'X'){
        return {...state, turnNumber: state.turnNumber++, turn: 'O'};
      } 
      return {...state,  turnNumber: state.turnNumber++, turn: 'X'};
    default:
      return state;
  }
}

export default reducer;