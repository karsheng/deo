import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_SIGNIN_ERROR,
	AUTH_SIGNUP_ERROR,
	OPEN_AUTH_DIALOG,
	CLOSE_AUTH_DIALOG
} from '../actions/types';

const initialState = {
	authDialogOpen: false
};

export default function(state = { ...initialState }, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, error:'', authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case AUTH_SIGNIN_ERROR:
			return { ...state, signinError: action.payload };
		case AUTH_SIGNUP_ERROR:
			return { ...state, signupError: action.payload };
		case OPEN_AUTH_DIALOG: 
			return { ...state, authDialogOpen: true };
		case CLOSE_AUTH_DIALOG: 
			return { ...state, authDialogOpen: false };
	}

	return state;
}