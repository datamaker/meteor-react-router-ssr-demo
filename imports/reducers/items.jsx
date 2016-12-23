import * as types from '../actions/ActionTypes.jsx';
import update from 'react-addons-update';

const initialState = {
    items : []
};

export default function items(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.ITEMS:
            return Object.assign( {}, state, {
                items : action.items,
            });
        case types.ITEMS_POST:
            return Object.assign( {}, state, {
                items : action.items,
            });
        case types.MEMO_LIST_SUCCESS:
            return Object.assign( {}, state, {
                items : action.items,
            });
        case types.MEMO_LIST_SUCCESS:
            return Object.assign( {}, state, {
                items : action.items,
            });
        default:
            return state;
    }
}
