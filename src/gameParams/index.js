import React, { useState } from 'react';
import { connect } from 'react-redux'
import { changeSize } from './actions';
export {default as reducer} from './reducer';

function GameParams(props){
  const [size, setSize] = useState(props.size);
  const [successCriteria, setSuccessCriteria] = useState(props.successCriteria);

  const handleSizeChange = e => {
    let _size = parseInt(e.target.value);
    if(e.target.value !== '') {
      setSize(_size);
      props.changeSize(_size);
    }
  }
  const handleSuccessCriteriaChange = e => {
    setSuccessCriteria(e.target.value);
    props.changeSuccessCriteria(successCriteria);
  }

  return (<>
      <div className="input">
        <label htmlFor="size">Size of Square</label>
        <input type="number" name="size" id="size" value={size} onChange={handleSizeChange} />
        <label htmlFor="successCriteria">Success Criteria</label>
        <input type="text" name="successCriteria" id="successCriteria" value={successCriteria} onChange={handleSuccessCriteriaChange} />
      </div></>)
}

const mapStateToProps = (state) => ({size:state.gameParams.size, successCriteria: state.gameParams.successCriteria})
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeSize: payload => parseInt(payload, 10) ? dispatch(changeSize(payload)) : null
})
export default connect(mapStateToProps, mapDispatchToProps)(GameParams);