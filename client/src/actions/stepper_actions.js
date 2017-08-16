import { UPDATE_STEPPER } from './types';

export function updateStepper(step) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_STEPPER,
			payload: step
		});
	};
}