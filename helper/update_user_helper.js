const request = require('supertest');
const app = require('../app');

module.exports = (
	token,
	name,
	fullName,
	phone,
	gender,
	identityNumber,
	nationality,
	countryOfResidence,
	city,
	postcode,
	state,
	emergencyContact,
	medicalCondition,
	interests,
	dateOfBirth,
	postalAddress
) => {
	return new Promise((resolve, reject) => {
		request(app)
			.put('/api/profile')
			.set('authorization', token)
			.send({
				name,
				fullName,
				phone,
				gender,
				identityNumber,
				nationality,
				countryOfResidence,
				city,
				postcode,
				state,
				emergencyContact,
				medicalCondition,
				interests,
				dateOfBirth,
				postalAddress
			})
			.end((err, res) => {
				resolve(res.body);
			});
	});
};
