const request = require('supertest');
const app = require('../app');


module.exports = (name, email, password) => {
	return new Promise((resolve, reject) => {
		request(app)
			.post('/api/signup')
			.send({
				name,
				email,
				password
			})
			.end((err, res) => {
				resolve(res.body.token);
			});
	});
}