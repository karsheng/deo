import axios from 'axios';
import { ROOT_URL } from '../constants';
import { 
	FETCH_EVENTS, 
	FETCH_EVENT,
	FETCH_SPECIFIC_EVENTS 
} from './types';

export function fetchEvents() {

	return (dispatch) => {
		axios.get(`${ROOT_URL}/api/event/open/all`)
		.then(response => {
			const events = response.data;

			dispatch({
				type: FETCH_EVENTS,
				payload: events
			});

		})
		.catch(err => {
			console.log(err);
		});
	}

}

export function fetchEvent(event_id, cb) {

	return (dispatch) => {
		axios.get(`${ROOT_URL}/api/event/${event_id}`)
		.then(response => {
			const event = response.data;
			dispatch({
				type: FETCH_EVENT,
				payload: event
			});

			cb();
		})
		.catch(err => {
			console.log(err);
		});
	}	
}

export function fetchSpecificEvents(type, cb) {
	
	return (dispatch) => {
		axios.get(`${ROOT_URL}/api/event/open?type=${type}`)
		.then(response => {
			const events = response.data;
			
			dispatch({
				type: FETCH_SPECIFIC_EVENTS,
				payload: events
			});

			cb();
		})
		.catch(err => {
			console.log(err);
		});
	}

}