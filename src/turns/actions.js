export const CHANGE_TURN = 'turns/changeTurn';
export const FREEZE_TURN = 'turns/freezeTurn';

export const changeTurns = payload => ({
  type: CHANGE_TURN,
  payload
})
export const freezeTurns = payload => ({
  type: FREEZE_TURN,
  payload
})