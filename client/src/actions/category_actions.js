import axios from 'axios';
import { ROOT_URL } from '../constants';
import { FETCH_CATEGORIES_AVAILABILITY } from './types';

export function fetchCategoriesAvailability(event_id) {
	const token = localStorage.getItem('deotoken');
	const config = {
		headers: { authorization: token }
	};
	if (token) {
		return function(dispatch) {
			axios
				.get(`${ROOT_URL}/api/event/category/available/${event_id}`, config)
				.then(response => {
					dispatch({
						type: FETCH_CATEGORIES_AVAILABILITY,
						payload: { [event_id]: response.data }
					});
				})
				.catch(err => {
					console.log(err);
				});
		};
	}
}
