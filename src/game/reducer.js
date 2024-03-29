import * as actions from './actions';
import * as gameParamsActions from '../gameParams/actions'
import { combineReducers } from 'redux'

/**
 *  Initial game state for 3 * 3 game
*/
const initGameState = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

/**
 *  Convert `X` move to 2, and `0` move to 1
 *  Empty values are considered 0
*/
const getState = (row, column, turn) => {
  if(turn === 'X'){
    return  2;
  } else if (turn === 'O') {
    return  1;
  }
}

/**
 *  Finds complete length of contnuous valus 
*/
function findLengthInDirection(position, gameState, value, change) {
  let {row, column} = position; // current position of move
  let upwardLength = 0; // continuous upward chain length of same values
  let downwardLength = 0; // continuous downward chain length of same values
  // positive direction
  while(row >= 0 && row < gameState.length && column >= 0 && column < gameState.length && gameState[row][column]) {
    if(gameState[row][column] === value){
      downwardLength++;
      row = row + change[0];
      column = column + change[1];
    } else {
      break;
    }
  }
  row = position.row - change[0];
  column = position.column - change[1];
  while(row >= 0 && row < gameState.length && column >= 0 && column < gameState.length && gameState[row][column]) {
    if(gameState[row][column] === value) {
      upwardLength++;
      row = row - change[0];
      column = column - change[1];
    } else {
      break;
    }
  }
  return upwardLength + downwardLength;
}

/**
 *  @description Checks if the current move is winning move by checking the complete game state
*/
export function isWinning({row, column}, gameState, successCriteria){
  var directions = [[1,0], [0, 1], [-1, -1], [-1, 1]];
  for (var i=0; i < directions.length; i++) {
    var lengthInDirection = findLengthInDirection({row, column}, gameState, gameState[row][column], directions[i]);
    if(lengthInDirection >= successCriteria) {
      return true;
    }
  }
  return false;
}

/**
 * Game state reducer
*/

function gameState(state = initGameState, action) {
  switch (action.type) {
    case gameParamsActions.CHANGE_SIZE:
      return new Array(action.payload).fill(0).map((v,i)=> new Array(action.payload).fill(0));

    case actions.CHANGE_GAME_STATE:
      var {row, column, turn, successCriteria} = action.payload;
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
      return newState;
    default:
      return state;
  }
}

/**
 *  Check if the game is over using game state
*/
function gameOver(state = false, action){
  switch(action.type){
    case actions.CHECK_GAME_OVER:
      var {row, column, gameState, successCriteria} = action.payload;
      return isWinning({row, column}, gameState, successCriteria);
    default: 
      return state;
  }
}

export default combineReducers({gameState, gameOver});