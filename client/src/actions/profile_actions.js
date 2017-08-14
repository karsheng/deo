import axios from 'axios';
import { ROOT_URL } from '../constants';
import { 
	FETCH_USER_INFO
} from './types';

export function fetchUserInfo() {
	const token = localStorage.getItem('deotoken');
	if (token) {
		return function(dispatch) {
			axios.get(
				`${ROOT_URL}/api/profile`,
				{
					headers:
					{
						authorization: token
					}
				}
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