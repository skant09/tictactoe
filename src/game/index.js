import React from 'react';
import { connect } from 'react-redux'
import { changeGameState, checkGameOver } from './actions';
import { changeTurns, freezeTurns } from '../turns/actions';
export { default as reducer } from './reducer';

export const Game = props => {
  const handleGameTurn = (row, column) => async e => {
    // if(props.freezeTurns) return;
    // props.freezeTurns();
    const {turn, turnNumber, successCriteria} = props;
    if(props.connectedToPeer){
      await window.peer.connectedRTC.send({
        turnNumber, row, column, turn
      })
    }

    if(props.gameState[row][column] === 0){
      props.changeGameState({row, column, turn, successCriteria});
      props.changeTurns({turn, turnNumber});
    }
  }

  var sizeArray = new Array(props.size).fill(0);
  const getState = (row, column) => {
    switch (props.gameState[row][column]) {
      case 2: 
        return 'X';
      case 1:
        return 'O';
      case 0:
      default:
        return '';
    }
  }

  return (<div style={{'display': 'flex','flexDirection': 'column','justifyContent': 'center','textAlign': 'center', 'height': '50vh'}}><div className="game">
    { 
      sizeArray.map((value, row) => (<div className="row" key={row+' row'}>
        {sizeArray.map((value, column)=> {
          return (<div className="element" key={column + ' column'} onClick={handleGameTurn(row, column)}>{getState(row, column)}</div>)
        })}
      </div>))
    }
  </div></div>);
}


const mapStateToProps = ({gameParams, gameState: {gameState, gameOver}, turns}) => {
  return {
    size: gameParams.size,
    successCriteria: gameParams.successCriteria,
    gameState,
    gameOver,
    turn: turns.turn,
    turnFreeze: turns.turnFreeze,
    turnNumber: turns.turnNumber,
    connectedToPeer: turns.connectedToPeer 
  }
};
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeGameState: payload => dispatch(changeGameState(payload)),
  checkGameOver: payload => dispatch(checkGameOver(payload)),
  changeTurns: payload => dispatch(changeTurns(payload)),
  freezeTurns: payload => dispatch(freezeTurns(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);