import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import Peer from 'peerjs';

import { changeGameState, checkGameOver } from './actions';
import { changeTurns, freezeTurns, setWinner } from '../turns/actions';
import {isWinning} from './reducer';
export { default as reducer } from './reducer';

/**
 *  React component for rendering the game
*/
export const Game = props => {
  const {turn, turnNumber, size, successCriteria, connectedToPeer, winner} = props;
  const [position, setPosition] = useState({});
  // const [winner, setWinner] = useState(null);
  const handleGameTurn = (row, column) => async e => {
    if(props.turnFreeze) return;
    if(props.connectedToPeer){
      props.freezeTurns();
      await window.peer.connectedRTC.send({
        turnNumber, row, column, turn, action: 'setGameState'
      })
    }
    setPosition({row, column});
    if(props.gameState[row][column] === 0){
      props.changeGameState({row, column, turn, successCriteria});
      props.changeTurns({turn, turnNumber});
    }
  }

  useEffect(() => {
    // TODO: fix syncing size and successCriteria
    if(connectedToPeer){
      window.peer 
      && window.peer.connectedRTC
      && window.peer.connectedRTC.send({action: 'setGameState', size, successCriteria})
    }
  }, [connectedToPeer]);

  useEffect(() => {
    const {row, column} = position;
    if(row!== undefined && column!== undefined){
      const _isWinning = isWinning({row, column}, props.gameState, successCriteria);
      if(_isWinning){
        document.title = "GAME OVER"
        window.peer 
        && window.peer.connectedRTC 
        && window.peer.connectedRTC.send({action: 'gameOver', turn})

        console.log("GAME OVER");
        props.freezeTurns();
        let winner = turn === 'X' ? 'O' : 'X';
        if(connectedToPeer){
          winner = turn;
        }
        props.setWinner(winner)
      }
    }
  }, [props.gameState])

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

  return (<div style={{'display': 'flex','flexDirection': 'column','justifyContent': 'center','textAlign': 'center', 'height': '50vh'}}>
      <div className="game">
        { 
          sizeArray.map((value, row) => (<div className="row" key={row+' row'}>
            {sizeArray.map((value, column)=> {
              return (<div className="element" key={column + ' column'} onClick={handleGameTurn(row, column)}>{getState(row, column)}</div>)
            })}
          </div>))
        }
      </div>
      {props.winner && <span> WINNER is {winner}</span>}
    </div>);
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
    winner: turns.winner,
    connectedToPeer: turns.connectedToPeer 
  }
};
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeGameState: payload => dispatch(changeGameState(payload)),
  checkGameOver: payload => dispatch(checkGameOver(payload)),
  changeTurns: payload => dispatch(changeTurns(payload)),
  freezeTurns: payload => dispatch(freezeTurns(payload)),
  setWinner: payload => dispatch(setWinner(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);