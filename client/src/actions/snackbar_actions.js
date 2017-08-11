import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from './types';

export function openSnackbar(message) {
	return function(dispatch) {
		dispatch({ 
			type: OPEN_SNACKBAR,
			payload: message
		});
	};
}

export function closeSnackbar() {
	return function(dispatch) {
		dispatch({ type: CLOSE_SNACKBAR });
	};
}
