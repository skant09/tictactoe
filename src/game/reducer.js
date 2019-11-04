import * as actions from './actions';
import * as gameParamsActions from '../gameParams/actions'

const initGameState = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
let turnNumber = 0;

const getState = (row, column, turn) => {
  if(turn === 'X'){
    return  2;
  } else if (turn === 'O') {
    return  1;
  }
}

function gameState(state = initGameState, action) {
  switch (action.type) {
    case gameParamsActions.CHANGE_SIZE:
      return new Array(action.payload).fill(0).map((v,i)=> new Array(action.payload).fill(0));

    case actions.CHANGE_GAME_STATE:
      var {row, column, turn} = action.payload;
      var newState = state.map((value, _row)=>{
        if(_row === row){
          return value.map((value, _column)=> {
            if(_column === column){
              return getState(row, column, turn);
            } else {
              return value;
            }
          })
        } 
        return [...value];
      })
      turnNumber = turnNumber+1;
      return newState;

    default:
      return state;
  }
}

export default gameState;