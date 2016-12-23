import {
    ITEMS
} from './ActionTypes.jsx';

export function items( data ) {
	return {
		type : ITEMS,
        items : data
	}
}