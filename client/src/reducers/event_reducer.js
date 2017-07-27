import _ from 'lodash';
import { 
	FETCH_EVENTS,
	FETCH_EVENT,
	FETCH_SPECIFIC_EVENTS
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case FETCH_EVENTS:
			return _.mapKeys(action.payload, '_id');
		case FETCH_EVENT:
			return { ...state, [action.payload._id]: action.payload };			
		case FETCH_SPECIFIC_EVENTS:
			const specificEvents = _.mapKeys(action.payload, '_id');
			return { ...state, ...specificEvents, filteredEvents: _.map(specificEvents, '_id') };
	}

	return state;
}