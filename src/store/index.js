import { createStore } from 'redux'
import { combineReducers } from 'redux'

import {reducer as gameParams} from '../gameParams';
import {reducer as turns} from '../turns';
import {reducer as gameState} from '../game';

const rootReducer = combineReducers({gameParams, turns, gameState})
const store = createStore(rootReducer);

// console.log(store.getState())
export default store;