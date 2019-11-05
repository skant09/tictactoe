import * as actions from './actions'

const turns = ['X', 'O'];
const initialState = {
  turnNumber: 0,
  turn: turns[0]
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      if(state.freeze) return state;
      ++state.turnNumber;
      if(action.payload.turn === 'X'){
        return {...state, turnNumber: state.turnNumber++, turn: 'O'};
      } 
      return {...state,  turnNumber: state.turnNumber++, turn: 'X'};
    case actions.FREEZE_TURN:
      console.trace('sd');
      if(state.turn === 'X'){
        return {...state, freeze: true, turn: 'O'};
      } 
      return {...state, freeze: true, turn: 'X'};
    default:
      return state;
  }
}

export default reducer;