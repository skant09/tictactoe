import { createStore } from 'redux'
import { combineReducers } from 'redux'

import {reducer as gameParams} from '../gameParams';
import {reducer as turns} from '../turns';

const rootReducer = combineReducers({gameParams, turns})
const store = createStore(rootReducer);

// console.log(store.getState())
export default store;