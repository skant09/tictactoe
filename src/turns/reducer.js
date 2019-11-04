import * as actions from './actions'

const turns = ['X', 'O'];

const initialState = turns[0]

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_TURN:
      if(state === 'X'){
        return 'O';
      } 
      if (state === 'O') {
        return 'X';
      }
    default:
      return initialState;
  }
}

export default reducer;