import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import eventReducer from './event_reducer';
import registrationReducer from './registration_reducer';
import participantReducer from './participant_reducer';

const rootReducer = combineReducers({
  form,
  auth : authReducer,
  events: eventReducer,
  registration: registrationReducer,
  participant: participantReducer
});

export default rootReducer;
