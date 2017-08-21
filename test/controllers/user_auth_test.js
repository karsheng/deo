const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const createAdmin = require('../../helper/create_admin_helper');
const createUser = require('../../helper/create_user_helper');
const signinUser = require('../../helper/user_signin_helper');
const updateUser = require('../../helper/update_user_helper');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const data = require('../../helper/');

describe('User Auth Controller', function(done) {
	this.timeout(15000);

	beforeEach(done => {
		createAdmin('karsheng_88@hotmail.com', 'qwerty123').then(token => {
			done();
		});
	});

	it('POST to /api/signup creates a user', done => {
		this.timeout(15000);
		request(app)
			.post('/api/signup')
			.send({
				name: 'Gavin Belson',
				email: 'gavin@hooli.com',
				password: 'qwerty123'
			})
			.end((err, res) => {
				User.findOne({ name: 'Gavin Belson' }).then(user => {
					assert(user.email === 'gavin@hooli.com');
					done();
				});
			});
	});

	it('POST to /api/signin signs in a user and return a token', done => {
		request(app)
			.post('/api/signup')
			.send({
				name: 'Gavin Belson',
				email: 'gavin@hooli.com',
				password: 'qwerty123'
			})
			.end((err, res) => {
				request(app)
					.post('/api/signin')
					.send({
						email: 'gavin@hooli.com',
						password: 'qwerty123'
					})
					.end((err, res) => {
						assert(res.body.token);
						done();
					});
			});
	});

	it('PUT to /api/user/email updates the user email', done => {
		createUser('Gavin Belson', 'gavin@hoover.com', 'qwerty123').then(token => {
			request(app)
				.put('/api/user/email')
				.set('authorization', token)
				.send({ email: 'gavin@gmail.com' })
				.end((err, res) => {
					User.findById(res.body._id).then(user => {
						assert(user.name === 'Gavin Belson');
						assert(user.email === 'gavin@gmail.com');
						done();
					});
				});
		});
	});

	it('POST to /api/user/password/change changes the user password', done => {
		createUser('Gavin Belson', 'gavin@hooli.com', 'qwerty123').then(token => {
			request(app)
				.post('/api/user/password/change')
				.set('authorization', token)
				.send({
					oldPassword: 'qwerty123',
					newPassword: 'hellothere123',
					confirmPassword: 'hellothere123'
				})
				.end((err, res) => {
					request(app)
						.post('/api/signin')
						.send({
							email: 'gavin@hooli.com',
							password: 'hellothere123'
						})
						.end((err, res) => {
							assert(res.body.token);
							done();
						});
				});
		});
	});

	it('GET to /api/profile returns profile of the user', done => {
		createUser('Gavin Belson', 'gavin@hooli.com', 'qwerty123').then(token => {
			updateUser(
				token,
				'Gavin Belson',
				'Gavin Belson',
				'1234567',
				true,
				'7654321',
				'United States',
				'United States',
				'San Francisco',
				'999999',
				'California',
				data.participant.emergencyContact,
				data.participant.medicalCondition,
				['running'],
				new Date(1957, 1, 1),
				data.participant.postalAddress
			).then(result => {
				request(app)
					.get('/api/profile')
					.set('authorization', token)
					.end((err, res) => {
						assert(res.body.name === 'Gavin Belson');
						assert(res.body.password === undefined);
						assert(res.body.isAdmin === undefined);
						assert(res.body.loginAttempts === undefined);
						assert(res.body.interests[0] === 'running');
						assert(res.body.fullName === 'Gavin Belson');
						done();
					});
			});
		});
	});

	it('PUT to /api/profile updates the profile of the user', done => {
		createUser('Gavin Belson', 'gavin@hooli.com', 'qwerty123').then(token => {
			request(app)
				.put('/api/profile')
				.set('authorization', token)
				.send({
					name: 'Gavin Smelson',
					fullName: 'Gavin Smelson',
					email: 'gavin@hooli.com',
					gender: false,
					identityNumber: 'A12345',
					nationality: 'United States',
					countryOfResidence: 'United States',
					city: 'San Francisco',
					postcode: 'ABC123',
					state: 'California',
					emergencyContact: data.participant.emergencyContact,
					medicalCondition: data.participant.medicalCondition,
					dateOfBirth: new Date(1957, 1, 1),
					postalAddress: data.participant.postalAddress,
					interests: ['Half-marathon', 'Full-marathon', 'running', 'cycling']
				})
				.end((err, res) => {
					User.findOne({ name: 'Gavin Smelson' }).then(user => {
						assert(res.body.password === undefined);
						assert(user.email === 'gavin@hooli.com');
						assert(user.interests.length === 4);
						assert(user.gender === false);
						assert(user.postcode === 'ABC123');
						done();
					});
				});
		});
	});

	it('Failed login more than five times locks the account for two hours', done => {
		createUser('Gavin Belson', 'gavin@hooli.com', 'qwerty123').then(_ => {
			signinUser('gavin@hooli.com', 'qwerty123').then(res => {
				assert(res.body.token);
				signinUser('gavin@hooli.com', 'wrongpassword').then(_ => {
					signinUser('gavin@hooli.com', 'wrongpassword').then(_ => {
						signinUser('gavin@hooli.com', 'wrongpassword').then(_ => {
							signinUser('gavin@hooli.com', 'wrongpassword').then(res => {
								signinUser('gavin@hooli.com', 'wrongpassword').then(res => {
									signinUser('gavin@hooli.com', 'qwerty123').then(res => {
										assert(res.body.token === undefined);
										done();
									});
								});
							});
						});
					});
				});
			});
		});
	});
});
