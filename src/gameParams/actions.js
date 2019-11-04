export const CHANGE_SIZE = 'gameParams/changeSize';
export const CHANGE_SUCCESS_CRITERIA = 'gameParams/changeSuccessCriteria';

export const changeSize = payload => ({
  type: CHANGE_SIZE,
  payload
})

export const changeSuccessCriteria = payload => ({
  type: CHANGE_SUCCESS_CRITERIA,
  payload
})