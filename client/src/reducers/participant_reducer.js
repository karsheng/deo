import {
	UPDATE_PARTICIPANT_INFO	
} from '../actions/types';

// TODO: to speed us testing. delete this after development
const fakeParticipant = {
  self: "yes",
  fullName: "Gavin Belson",
  email: "gavin@hooli.com",
  identityNumber: "12345678",
  male: "male",
  nationality: "Malaysia",
  countryOfResidence: "Malaysia",
  phone: "1234567",
  postcode: "1235456",
  apparelSize: "M",
  dateOfBirth: new Date(1968,1,1),
  emergencyContactName: "Richard Hendricks",
  emergencyContactPhone: "123475953",
  relationship: "123475953",
  withMedicalCondition: "yes",
  medicalConditionDescription: "High colestrol because of blood boy"
}

export default function(state = {...fakeParticipant}, action) {
	switch(action.type) {
		case UPDATE_PARTICIPANT_INFO: 
			return { ...action.payload }
	}
	
	return state;
}