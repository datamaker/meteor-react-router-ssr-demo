import {
    ITEMS,
    ITEMS_POST,
    ITEMS_POST_SUCCESS,
    ITEMS_POST_FAILURE,
    ITEMS_REMOVE
} from './ActionTypes.jsx';

export function items( data ) {
	return {
		type : ITEMS,
        items : data
	}
}

export function addOneRequest() {
    return (dispatch) => {
        dispatch(addOne());

        return Meteor.call('addOne', (error, result) => {
            if(!error){
                dispatch(addOneSuccess());
            }else{
                dispatch(addOneFailure(error));
            }
        });
    };
}

export function addOne() {
    return {
        type: ITEMS_POST
    };
}

export function addOneSuccess() {
    return {
        type: ITEMS_POST_SUCCESS
    };
}

export function addOneFailure(error) {
    return {
        type: ITEMS_POST_FAILURE,
        error
    };
}




export function removeRequest( data ) {
    return {
        type : ITEMS_ADDONE,
        items : data
    }
}