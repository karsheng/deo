const request = require('supertest');
const app  = require('../app');

module.exports = (token, name, price, gender, ageMin, ageMax, participantLimit, event, prize, type) => {
	return new Promise((resolve, reject) => {
		request(app)
			.post('/api/admin/category')
			.set('admin-authorization', token)
			.send({
				name,
				price,
				gender,
				ageMin,
				ageMax,
				participantLimit,
				event,
				prize,
				type
			})
			.end((err, res) => {
				resolve(res.body);
			});
	}); 
}