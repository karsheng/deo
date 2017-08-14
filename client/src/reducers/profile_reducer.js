import {
	FETCH_USER_INFO
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case FETCH_USER_INFO:
			const user = action.payload;
			let info = { ...action.payload };
			
			if (user.emergencyContact) {
				info.emergencyContactName = user.emergencyContact.name;
				info.relationship = user.emergencyContact.relationship;
				info.emergencyContactPhone = user.emergencyContact.phone;
			}
			
			if (user.medicalCondition) {
				info.withMedicalCondition = user.medicalCondition.yes;
				info.medicalConditionDescription = user.medicalCondition.description;
			
			}
			
			if (user.postalAddress) {
				info.line1 = user.postalAddress.line1;
				info.line2 = user.postalAddress.line2;
				info.line3 = user.postalAddress.line3;
				info.postalCity = user.postalAddress.city;
				info.postalPostcode = user.postalAddress.postcode;
				info.postalState = user.postalAddress.state;
				info.postalCountry = user.postalAddress.country;
			}
			
			return { ...state, info: info };
	}

	return state;
}