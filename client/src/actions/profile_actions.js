import axios from 'axios';
import { ROOT_URL } from '../constants';
import { 
	FETCH_USER_INFO,
	UPDATE_USER_INFO
} from './types';

const token = localStorage.getItem('deotoken');
const config = {
	headers: { authorization: token }
};

export function fetchUserInfo() {
	if (token) {
		return function(dispatch) {
			axios.get(
				`${ROOT_URL}/api/profile`,
				config
			)
			.then(response => {
				dispatch({
					type: FETCH_USER_INFO,
					payload:response.data
				});

			})
			.catch(err => {
				console.log(err);
			});
		};
	}
}

export function updateUserProfile(profile, cb) {

	if (token) {
		return function(dispatch) {
			axios.put(
				`${ROOT_URL}/api/profile`,
				profile,
				config
			)
			.then(response => {
				dispatch({
					type: UPDATE_USER_INFO,
					payload: response.data
				});
			
				cb();
			})
			.catch(err => {
				console.log(err);
			});
			
		};
	}
}