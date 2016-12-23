import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes.jsx';

/* ====== AUTH ====== */

/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return Meteor.loginWithPassword(username, password, ( error ) => {
            if( !error ){
                dispatch(loginSuccess(username));
            } else {
                dispatch(loginFailure());
            }
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(username, password) {
    return (dispatch) => {
        // inform register API is starting
        dispatch(register());

        return Meteor.call('', username, password, (error) => {
            if ( !error ){
                dispatch(registerSuccess());
            } else {
                dispatch(registerFailure(error.response.data.code));
            }
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS */

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return Meteor.call('', (error, response) => {
            if ( !error ){
                dispatch(getStatusSuccess(response.data.info.username));
            } else {
                dispatch(getStatusFailure());
            }
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}


/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return Meteor.logout( ( error ) => {
            if ( !error ){
                dispatch(logout());
            }
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
