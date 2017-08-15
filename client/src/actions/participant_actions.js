import {
	UPDATE_PARTICIPANT_INFO	
} from './types';

export function updateParticipantInfo(participant) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_PARTICIPANT_INFO,
			payload: participant
		});
	};
}