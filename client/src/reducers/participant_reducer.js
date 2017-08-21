import { UPDATE_PARTICIPANT_INFO } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case UPDATE_PARTICIPANT_INFO:
			return { ...action.payload };
	}

	return state;
}
