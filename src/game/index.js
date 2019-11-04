import React from 'react';
import { connect } from 'react-redux'
import { changeGameState } from './actions';
import { changeTurns } from '../turns/actions';
export { default as reducer } from './reducer';

export const Game = props => {
    const handleGameTurn = (row, column) => async e => {
      const online = true;
      if(online){
        await window.peer.connectedRTC.send({
          turnNumber: props.turnNumber + 1, row, column, turn: props.turn
        })
      }
    
      if(props.gameState[row][column] === 0){
        // changeGameState(row, column)
        props.changeGameState({row, column, turn: props.turn});  
        props.changeTurns(props.turn);  
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
    return (<div className="game">
      { 
        sizeArray.map((value, row) => (<div className="row" key={row+' row'}>
          {sizeArray.map((value, column)=> {
            return (<div className="element" key={column + ' column'} onClick={handleGameTurn(row, column)}>{getState(row, column)}</div>)
          })}
        </div>))
      }
    </div>);
}


const mapStateToProps = ({gameParams, gameState, turns}) => ({size: gameParams.size, successCriteria: gameParams.successCriteria, gameState, turn: turns.turn, turnNumber: turns.turnNumber});
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeGameState: payload => dispatch(changeGameState(payload)),
  changeTurns: payload => dispatch(changeTurns(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Game);