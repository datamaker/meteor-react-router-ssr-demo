import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import authentication from './authentication.jsx';
import items from './items.jsx';
import size from './size.jsx';
import memo from './memo.jsx';

export default combineReducers({
    authentication, size, items, memo, routing: routerReducer
});