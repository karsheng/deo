import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR
} from '../actions/types';

const initialState = {
    open: false,
    message: ''
};

export default function(state = { ...initialState }, action) {
	switch(action.type) {
		case OPEN_SNACKBAR:
			return { ...state, open: true, message: action.payload };
		case CLOSE_SNACKBAR:
			return { ...state, open: false, message: '' };
	}

	return state;
}