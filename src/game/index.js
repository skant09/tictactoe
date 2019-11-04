import React, {useState} from 'react';
import { connect } from 'react-redux'
import gameParams from '../turns/reducer';
export {default as reducer} from './reducer';

export function Game(props) {
  console.log(props)
  var sizeArray = new Array(props.size).fill(0);
  const getState = (row, column) => {
    switch (props.gameState[row][column]) {
      case 2: 
        return 'X';
      case 1:
        console.log(row, column)
        return 'O';
      case 0:
      default:
        return '';
    }

  }
  return (<div className="game">
    {
      sizeArray.map((value, row) => (<div className="row" key={row+' row'}>
        {sizeArray.map((value, column)=> <div className="element" key={column + ' column'}>{getState(row, column)}</div>)}
      </div>))
    }
  </div>);
}

const mapStateToProps = ({gameParams, gameState}) =>  ({size: gameParams.size, successCriteria: gameParams.successCriteria, gameState});
export default connect(mapStateToProps)(Game);