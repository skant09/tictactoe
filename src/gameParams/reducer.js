import * as actions from './actions'
const initialState = {
  size: 3,
  successCriteria: 3
}

function gameParams(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_SIZE:
      // validation for size vs successcriteria
      return {...initialState, size: action.payload}
    case actions.CHANGE_SUCCESS_CRITERIA:
      // validation for size vs successcriteria
      return {...initialState, successCriteria: action.payload}
    default:
      return state
  }
}

export default gameParams;