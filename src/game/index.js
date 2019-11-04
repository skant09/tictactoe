import React, {useState, Component} from 'react';
import { connect } from 'react-redux'
import { changeGameState } from './actions';
import { changeTurns } from '../turns/actions';
export {default as reducer} from './reducer';

export class Game extends Component {
  render(){
    const handleGameTurn = (row, column) => e => {
      if(this.props.gameState[row][column] === 0){
        // changeGameState(row, column)
        this.props.changeGameState({row, column, turn: this.props.turn});  
        this.props.changeTurns(this.props.turn);  
      }
    }
    
    var sizeArray = new Array(this.props.size).fill(0);
    const getState = (row, column) => {
      switch (this.props.gameState[row][column]) {
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
}

const mapStateToProps = ({gameParams, gameState, turns}) => ({size: gameParams.size, successCriteria: gameParams.successCriteria, gameState, turn: turns});
const mapDispatchToProps = dispatch => ({
  changeGameState: payload => dispatch(changeGameState(payload)),
  changeTurns: payload => dispatch(changeTurns(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Game);