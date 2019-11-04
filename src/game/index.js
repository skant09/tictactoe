import React, {useState} from 'react';
import { connect } from 'react-redux'
export {default as reducer} from './reducer';

export function Game(props) {
  var sizeArray = new Array(props.size).fill(0);
  return (<div className="game">
    {
      sizeArray.map((value, row) => (<div className="row">
        {sizeArray.map((value, column)=> <div className="element">{(row+column)%2 === 0 ? ' ' : 'X'}</div>)}
      </div>))
    }
  </div>);
}

const mapStateToProps = ({gameParams: {size, successCriteria}}) => ({size, successCriteria});
export default connect(mapStateToProps)(Game);