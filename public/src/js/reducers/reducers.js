import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import nav from './nav';
import commodity from './commodity';
import user from './user';
import baseinfo from './baseinfo';

var reducers = combineReducers({
    nav: nav,
    commodity: commodity,
    user: user,
    baseinfo: baseinfo,
    routing: routerReducer
})

export default reducers;