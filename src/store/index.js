import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'

import thunk from 'redux-thunk';
import {reducer as gameParams} from '../gameParams';
import {reducer as turns} from '../turns';
import {reducer as gameState} from '../game';
import logger from 'redux-logger'

const rootReducer = combineReducers({gameParams, turns, gameState})
const store = createStore(rootReducer, applyMiddleware(...[thunk]));

export default store;