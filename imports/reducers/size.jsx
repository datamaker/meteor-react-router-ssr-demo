import * as types from '../actions/ActionTypes.jsx';

const initialState = {
    screenWidth : 0,
    screenHeight : 0
};

export default function size(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.RESIZE:
            return Object.assign( {}, state, {
                screenWidth : action.screenWidth,
                screenHeight : action.screenHeight
            });
        default:
            return state;
    }
}
