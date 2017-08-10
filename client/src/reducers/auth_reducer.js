import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_SIGNIN_ERROR,
	AUTH_SIGNUP_ERROR,
	FETCH_USER_INFO,
	OPEN_SIGNIN_DIALOG,
	CLOSE_SIGNIN_DIALOG,
	OPEN_SIGNUP_DIALOG,
	CLOSE_SIGNUP_DIALOG
} from '../actions/types';

export default function(state = { signinDialogOpen: false, signupDialogOpen: false }, action) {
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
		case OPEN_SIGNIN_DIALOG: 
			return { ...state, signinDialogOpen: true };
		case CLOSE_SIGNIN_DIALOG: 
			return { ...state, signinDialogOpen: false };
		case OPEN_SIGNUP_DIALOG: 
			return { ...state, signupDialogOpen: true };
		case CLOSE_SIGNUP_DIALOG: 
			return { ...state, signupDialogOpen: false };
	}

	return state;
}