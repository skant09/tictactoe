import * as actions from './actions'

const turns = ['X', 'O'];
const initialState = {
  turnNumber: 0,
  turn: turns[0],
  turnFreeze: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      if(state.turnFreeze) return state;
      ++state.turnNumber;
      if(action.payload.turn === 'X'){
        return {...state, turnNumber: state.turnNumber++, turn: 'O'};
      } 
      return {...state,  turnNumber: state.turnNumber++, turn: 'X'};
    
    case actions.FREEZE_TURN:
      console.trace(' freeze turn');
      return {...state, turnFreeze: true};
    
    case actions.UNFREEZE_TURN:
      return {...state, turnFreeze: false};
    
    default:
      return state;
  }
}

export default reducer;