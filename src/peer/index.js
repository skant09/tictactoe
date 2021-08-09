import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Peer from 'peerjs';

import * as gameAction from '../game/actions';
import { changeSize, changeSuccessCriteria } from '../gameParams/actions';
import { changeTurns, freezeTurns, unfreezeTurns, setConnectedToPeer, setWinner } from '../turns/actions';

/**
 * Peer js configuration. It is included in the index.html
*/
export const getPeer = () => {
  if(!global.peer) {
    global.peer = global.peer = new Peer();
    return global.peer
  }
  console.log(global.peer);
  return global.peer;
}

function setDataReceive(connection, dispatch){
  connection.on('data', function(data) {
    console.log('data received', data);
    if(data.action === 'gameOver'){
      document.title = "GAME OVER"
      dispatch(freezeTurns());
      dispatch(setWinner(data.turn))
    }

    if(data.action === 'setGameState'){
      const {row, column, turn, turnNumber} = data;
      dispatch(gameAction.changeGameState({row, column, turn}));
      dispatch(changeTurns({turn, turnNumber}));
      dispatch(unfreezeTurns())
    }

    if(data.action === 'setSize'){
      const {size, successCriteria} = data;
      dispatch(changeSize(size));
      dispatch(changeSuccessCriteria(successCriteria));
    }
  });
  dispatch(setConnectedToPeer(connection.peer));
}

const PeerComponent = props => {
  const [peerId, setPeerID] = useState('');
  const [connectToPeerId, setConnectToPeerID] = useState('');

  useEffect(() => {
    getPeer().on('open', function(id) {
      setPeerID(id);
    });
  }, [])

  useEffect(()=>{
    getPeer().on('connection', function(peerjsConnection) {
      setConnectToPeerID(peerjsConnection.peer);
      // TODO: find way to avoid making this global
      getPeer().connectedRTC = peerjsConnection;
      peerjsConnection.on('open', function(peer) {
        setDataReceive(peerjsConnection, props.dispatch);
      });
    });
  }, [])
  
  useEffect(() => {
    const connectWithPeer = async function () {
      var peerjsConnection = getPeer().connectedRTC = await getPeer().connect(connectToPeerId);
      setDataReceive(peerjsConnection, props.dispatch);
    }
    if(connectToPeerId.length > 3) {
      connectWithPeer()
    }
  }, [connectToPeerId])

  const handleConnectToPeer = e => {
    setConnectToPeerID(e.target.value);
  }

  return (
    <div>
      <label htmlFor="peerId">My peer ID: </label>
      <span type="text" name="peerId" id="peerId" value={peerId} minLength={15} style={{display: 'inline-block'}}>{' '}{peerId}{' '}</span>
      <label htmlFor="peerId">{props.connected ? '  Connected to  ' : '  Connect to peer ID:  '}</label>
      <input type="text" name="peerId" id="peerId" value={connectToPeerId} onChange={handleConnectToPeer} />
    </div>
  );
}

const mapStateToProps = (state) => ({...state.gameParams})
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeTurns: payload => dispatch(changeTurns()),
  freezeTurns: payload => dispatch(freezeTurns())
})

export default connect(mapStateToProps, mapDispatchToProps)(PeerComponent);