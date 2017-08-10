import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_SIGNIN_ERROR,
	AUTH_SIGNUP_ERROR,
	FETCH_USER_INFO,
	OPEN_AUTH_DIALOG,
	CLOSE_AUTH_DIALOG
} from '../actions/types';

export default function(state = { authDialogOpen: false }, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, error:'', authenticated: true };
		case UNAUTH_USER:
			return { ...state, ...{ authenticated: false, info: {} } };
		case AUTH_SIGNIN_ERROR:
			return { ...state, signinError: action.payload };
		case AUTH_SIGNUP_ERROR:
			return { ...state, signupError: action.payload };
		case FETCH_USER_INFO:
			return { ...state, info: action.payload };
		case OPEN_AUTH_DIALOG: 
			return { ...state, authDialogOpen: true };
		case CLOSE_AUTH_DIALOG: 
			return { ...state, authDialogOpen: false };
	}

	return state;
}