import * as actions from './actions';
import * as gameParamsActions from '../gameParams/actions'

const initGameState = [
  [0,0,0],
  [1,0,0],
  [0,0,2]
];

function gameState(state = initGameState, action) {
  switch (action.type) {
    case gameParamsActions.CHANGE_SIZE:
      return new Array(action.payload).fill(0).map((v,i)=> new Array(action.payload).fill(0));

    case actions.CHANGE_GAME_STATE: 
      var {row, column, turn} = action.payload;
      if(turn === 'X'){
        state[row][column] =  2;
      } else if (turn === 'O') {
        state[row][column] =  1;
      }
      return {...state};
    default:
      return state;
  }
}

export default gameState;