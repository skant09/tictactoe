import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import * as gameAction from '../game/actions';
import { changeTurns } from '../turns/actions';

var peer = window.peer = new window.Peer({key: 'lwjd5qra8257b9'});
function setDataReceive(connection, dispatch){
  connection.on('data', function(data) {
    console.log(data);
    const {row, column, turn, turnNumber} = data;
    dispatch(gameAction.changeGameState({row, column, turn}));
    dispatch(changeTurns({turn, turnNumber}));
  });
}
const Peer = props => {
  const [peerId, setPeerID] = useState('');
  const [connectToPeerId, setConnectToPeerID] = useState('');

  useEffect(() => {
    peer.on('open', function(id) {
      setPeerID(id);
    });
  }, [])

  useEffect(() => {
    peer.on('connection', function(peerjsConnection) {
      console.log('connected');
      // TODO: find way to avoid making this global
      window.peer.connectedRTC = peerjsConnection;
      peerjsConnection.on('open', function(peer) {
        setDataReceive(peerjsConnection, props.dispatch);
      });
    });
    
    async function connectWithPeer() {
      var peerjsConnection = window.peer.connectedRTC = await peer.connect(connectToPeerId);
      setDataReceive(peerjsConnection, props.dispatch);
    }
    connectWithPeer();
  }, [connectToPeerId, props.dispatch]);


  const handleConnectToPeer = e => {
    setConnectToPeerID(e.target.value);
  }

  return (
    <div>
      <label htmlFor="peerId">My peer ID: </label>
      <span type="text" name="peerId" id="peerId" value={peerId} minLength={15} style={{display: 'inline-block'}}>{' '}{peerId}{' '}</span>
      <label htmlFor="peerId">  Connect to peer ID</label>
      <input type="text" name="peerId" id="peerId" value={connectToPeerId} onChange={handleConnectToPeer} />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  changeTurns: payload => dispatch(changeTurns())
})

export default connect(null, mapDispatchToProps)(Peer);