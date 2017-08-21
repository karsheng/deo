import _ from 'lodash';
import {
	DISPATCH_EVENTS_CATEGORIES,
	DISPATCH_EVENT_CATEGORIES,
	FETCH_CATEGORIES_AVAILABILITY
} from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case DISPATCH_EVENTS_CATEGORIES:
			const events = action.payload;
			events.map(event => {
				const categories = _.mapKeys(event.categories, '_id');

				state = { ...state, [event._id]: categories };
			});
			return state;

		case DISPATCH_EVENT_CATEGORIES:
			const event = action.payload;
			const categories = _.mapKeys(event.categories, '_id');
			return { ...state, [event._id]: categories };

		case FETCH_CATEGORIES_AVAILABILITY:
			const event_id = _.keys(action.payload)[0];

			_.map(action.payload[event_id], availability => {
				const cat_id = _.keys(availability)[0];
				state[event_id][cat_id].available = availability[cat_id];
			});

			return state;
	}

	return state;
}
