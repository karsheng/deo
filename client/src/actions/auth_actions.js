import axios from 'axios';
import { ROOT_URL } from '../constants';
import { 
	AUTH_USER,
	UNAUTH_USER,
	AUTH_SIGNIN_ERROR,
	AUTH_SIGNUP_ERROR,
	OPEN_AUTH_DIALOG,
	CLOSE_AUTH_DIALOG,
	FETCH_USER_INFO,
	UPDATE_USER_INFO
} from './types';


export function signinUser({ email, password }, cb) {

	return function(dispatch) {
		axios.post(`${ROOT_URL}/api/signin`, { email, password })
			.then(response => {
				localStorage.setItem('deotoken', response.data.token);
				axios.get(
					`${ROOT_URL}/api/profile`, 
					{
						headers: 
						{ 
							authorization: response.data.token
						}
					}
				)
				.then(response => {
					dispatch({ type: AUTH_USER });
					dispatch({
						type: FETCH_USER_INFO,
						payload: response.data
					});

					cb(null);
				})
				.catch((err) => {
					console.log(err);
					dispatch(authSigninError('An error occured'));
					cb(err);
					
				});				
			})
			.catch((err) => {
				console.log(err);
				dispatch(authSigninError('Bad Sign In Info'));
				cb(err);
			});
	};

}

export function authSigninError(error) {
	return {
		type: AUTH_SIGNIN_ERROR,
		payload: error
	};
}

export function authSignupError(error) {
	return {
		type: AUTH_SIGNUP_ERROR,
		payload: error
	};
}

export function signupUser(formProps, cb) {
	return function(dispatch) {

		axios.post(`${ROOT_URL}/api/signup`, formProps)
			.then(response => {
				localStorage.setItem('deotoken', response.data.token);
				axios.get(
					`${ROOT_URL}/api/profile`, 
					{
						headers: 
						{ 
							authorization: response.data.token
						}
					}
				)
				.then(response => {
					dispatch({ type: AUTH_USER });
					dispatch({
						type: FETCH_USER_INFO,
						payload: response.data
					});

					cb(null);
				})
				.catch((err) => {
					console.log(err);
					dispatch(authSignupError('An error occured'));
					cb(err);

				});
			})
			.catch(({response}) => {
				dispatch(authSignupError(response.data.error));
				cb(response.data.error);
			});
	};

}

export function signoutUser() {
	localStorage.removeItem('deotoken');
	return function(dispatch) {
		dispatch({ type: UNAUTH_USER });
		dispatch({
			type: UPDATE_USER_INFO,
			payload: {}
		});
	};
}

export function openAuthDialog() {
	return function(dispatch) {
		dispatch({ type: OPEN_AUTH_DIALOG });
	}; 
}

export function closeAuthDialog() {
	return function(dispatch) {
		dispatch({ type: CLOSE_AUTH_DIALOG });
	};
}

