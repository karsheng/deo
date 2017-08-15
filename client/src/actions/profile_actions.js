import axios from 'axios';
import { ROOT_URL } from '../constants';
import { 
	FETCH_USER_INFO,
	UPDATE_USER_INFO
} from './types';



export function fetchUserInfo() {
	const token = localStorage.getItem('deotoken');
	const config = {
		headers: { authorization: token }
	};
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

export function updateUserInfo(profile, cb) {
	const token = localStorage.getItem('deotoken');
	const config = {
		headers: { authorization: token }
	};

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