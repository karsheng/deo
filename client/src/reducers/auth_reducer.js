import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_USER_INFO,
	OPEN_SIGNIN_DIALOG,
	CLOSE_SIGNIN_DIALOG
} from '../actions/types';

export default function(state = { signinDialogOpen: false }, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, error:'', authenticated: true };
		case UNAUTH_USER:
			return { ...state, ...{ authenticated: false, info: {} } };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case FETCH_USER_INFO:
			return { ...state, info: action.payload };
		case OPEN_SIGNIN_DIALOG: 
			return { ...state, signinDialogOpen: true }
		case CLOSE_SIGNIN_DIALOG: 
			return { ...state, signinDialogOpen: false }
	}

	return state;
}