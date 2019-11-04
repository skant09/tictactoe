import React, {useState} from 'react';
import { connect } from 'react-redux'
import {changeTurns} from './actions';
export {default as reducer} from './reducer';

function Turns(props) {
  return (<div className="ticTac">
    <button className={props.turn==='X' ? 'highlight': ''}>X</button>
    <button className={props.turn==='O' ? 'highlight': ''}>O</button>
  </div>)
}


const mapStateToProps = (state) => ({turn:state.turns})
const mapDispatchToProps = dispatch => ({
  changeTurns: payload => dispatch(changeTurns(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Turns);