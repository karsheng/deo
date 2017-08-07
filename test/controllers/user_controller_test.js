const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const createAdmin = require("../../helper/create_admin_helper");
const createRegistration = require("../../helper/create_registration_helper");
const createCategory = require("../../helper/create_category_helper");
const createUser = require("../../helper/create_user_helper");
const createEvent = require("../../helper/create_event_helper");
const updateEvent = require("../../helper/update_event_helper");
const createMeal = require("../../helper/create_meal_helper");
const faker = require("faker");
const mongoose = require("mongoose");
const Registration = mongoose.model("registration");

describe("User Controller", function(done) {
	this.timeout(15000);
	var adminToken, userToken;
	var cat1, cat2, cat3, cat4;
	var meal1, meal2, meal3;
	var event;

	beforeEach(done => {
		createAdmin("karshenglee@gmail.com", "qwerty123").then(token => {
			adminToken = token;
			Promise.all([
				createMeal(
					adminToken,
					"Food 1",
					11.0,
					faker.lorem.paragraph(),
					faker.image.food()
				),
				createMeal(
					adminToken,
					"Food 2",
					22.0,
					faker.lorem.paragraph(),
					faker.image.food()
				),
				createMeal(
					adminToken,
					"Food 3",
					33.0,
					faker.lorem.paragraph(),
					faker.image.food()
				)
			]).then(meals => {
				meal1 = meals[0];
				meal2 = meals[1];
				meal3 = meals[2];

				createEvent(adminToken, "Event 1").then(e => {
					Promise.all([
						createCategory(
							adminToken,
							"5km",
							{ earlyBird: 40, normal: 50 },
							true,
							21,
							48,
							1000,
							e,
							"RM 100",
							"run",
							5
						),
						createCategory(
							adminToken,
							"10km",
							{ earlyBird: 40, normal: 60 },
							true,
							21,
							48,
							1000,
							e,
							"RM 100",
							"run",
							10
						),
						createCategory(
							adminToken,
							"half-marathon",
							{ earlyBird: 40, normal: 70 },
							true,
							21,
							48,
							1000,
							e,
							"RM 100",
							"run",
							21
						),
						createCategory(
							adminToken,
							"full-marathon",
							{ earlyBird: 40, normal: 80 },
							true,
							21,
							48,
							1000,
							e,
							"RM 100",
							"run",
							42
						)
					]).then(cats => {
						cat1 = cats[0];
						cat2 = cats[1];
						cat3 = cats[2];
						cat4 = cats[3];
						updateEvent(
							adminToken,
							e._id,
							"Event 1",
							new Date().getTime(),
							"Desa Parkcity",
							3.1862,
							101.6299,
							faker.lorem.paragraph(),
							faker.image.imageUrl(),
							[cat1, cat2, cat3, cat4],
							[meal1, meal2, meal3],
							true,
							{
								address: "1 Newell Road",
								time: "11th Nov 2017, 12th Nov 2017",
								description: "collection description",
								lat: 3.11,
								lng: 101
							},
							"http:result.com/result",
							"Kuala Lumpur",
							Date.now() - 1000 * 60 * 60 * 24 * 3,
							Date.now() + 1000 * 60 * 60 * 24 * 30,
							[
								{
									name: "Fictional Sports Brand",
									email: "Fictional@sportsbrand.com",
									website: "fictionalsportsbrand.com",
									socialMedia: {
										facebook: "facebook.com/fictionalsportsbrand",
										twitter: "twitter.com/fictionalsportsbrand",
										instagram: "instagram.com/fictionalsportsbrand",
										youtube: "youtube.com/fictionalsportsbrand",
										snapchat: "@fictionalsportsbrand",
										pinterest: "@fictionalsportsbrand"
									}
								}
							]
						).then(updatedEvent => {
							event = updatedEvent;
							createUser(
								"Gavin Belson",
								"gavin@hooli.com",
								"qwerty123",
								true,
								"100 Hooli Road",
								"Silicon Valley",
								"Palo Alto",
								"San Francisco",
								45720,
								"U.S.",
								["5km", "10km", "Half-marathon", "Full-marathon"],
								new Date(1988, 1, 2)
							).then(ut => {
								userToken = ut;
								done();
							});
						});
					});
				});
			});
		});
	});

	it("GET to /api/registration/:event_id retrieves registration info", done => {
		const orders = [{ meal: meal1, quantity: 1 }, { meal: meal2, quantity: 2 }];
		const participant = {
			fullName: "Gavin Belson",
			identityNumber: "1234567",
			nationality: "U.S.",
			countryOfResidence: "U.S.",
			gender: true,
			dateOfBirth: new Date(1988, 1, 2),
			email: "gavin@hooli.com",
			phone: "1234567890",
			postcode: "45720",
			city: "San Francisco",
			state: "California",
			emergencyContact: {
				name: "Richard Hendricks",
				relationship: "friend",
				phone: "1234567890"
			},
			medicalCondition: {
				yes: true,
				description: "High colestrol because of the blood boy"
			},
			apparelSize: "L",
			waiverDeclaration: true
		};
		
		createRegistration(userToken, event._id, cat1, orders, participant, true).then(reg => {
			request(app)
				.get(`/api/registration/${reg._id}`)
				.set("authorization", userToken)
				.end((err, res) => {
					assert(res.body.event.name === "Event 1");
					assert(res.body.orders.length === 2);
					// not eligible for earlybird
					assert(res.body.totalBill === 105);
					assert(res.body.participant.registration.toString() === reg._id.toString());
					assert(res.body.participant.fullName === 'Gavin Belson');
					done();
				});
		});
	});

	it("POST to /api/event/register/:event_id creates a registration", done => {
		const participant = {
			fullName: "Gavin Belson",
			identityNumber: "1234567",
			nationality: "U.S.",
			countryOfResidence: "U.S.",
			gender: true,
			dateOfBirth: new Date(1988, 1, 2),
			email: "gavin@hooli.com",
			phone: "1234567890",
			postcode: "45720",
			city: "San Francisco",
			state: "California",
			emergencyContact: {
				name: "Richard Hendricks",
				relationship: "friend",
				phone: "1234567890"
			},
			medicalCondition: {
				yes: true,
				description: "High colestrol because of the blood boy"
			},
			apparelSize: "L",
			waiverDeclaration: true
		};
		request(app)
			.post(`/api/event/register/${event._id}`)
			.send({
				category: cat1,
				orders: [{ meal: meal1, quantity: 1 }, { meal: meal2, quantity: 2 }],
				participant,
				registerForSelf: true
			})
			.set("authorization", userToken)
			.end((err, res) => {
				Registration.findById(res.body._id)
					.populate({ path: "user", model: "user" })
					.populate({ path: "event", model: "event" })
					.populate({ path: "category", model: "category" })
					.populate({ path: "participant", model: "participant" })
					.then(reg => {
						assert(reg.totalBill === 105);
						assert(reg.event.name === "Event 1");
						assert(reg.user.name === "Gavin Belson");
						assert(reg.category.name === "5km");
						assert(reg.paid === false);
						assert(reg.registerForSelf === true);
						assert(reg.participant.fullName === 'Gavin Belson');
						done();
					});
			});
	});
	
	it('updates user unpaid registration document when POST to /api/event/register/:event_id', done => {
		let orders = [{ meal: meal1, quantity: 1 }, { meal: meal2, quantity: 2 }];
		let participant = {
			fullName: "Gavin Belson",
			identityNumber: "1234567",
			nationality: "U.S.",
			countryOfResidence: "U.S.",
			gender: true,
			dateOfBirth: new Date(1988, 1, 2),
			email: "gavin@hooli.com",
			phone: "1234567890",
			postcode: "45720",
			city: "San Francisco",
			state: "California",
			emergencyContact: {
				name: "Richard Hendricks",
				relationship: "friend",
				phone: "1234567890"
			},
			medicalCondition: {
				yes: true,
				description: "High colestrol because of the blood boy"
			},
			apparelSize: "L",
			waiverDeclaration: true
		};
		
		createRegistration(userToken, event._id, cat1, orders, participant, true)
			.then(regOld => {
				Registration.findById(regOld._id)
				.populate({ path: "event", model: "event" })
				.populate({ path: "category", model: "category" })
				.populate({ path: "participant", model: "participant" })
				.then(result => {
					assert(result.participant.fullName === "Gavin Belson");
					assert(result.category.name === '5km');
					assert(result.orders.length === 2);
					assert(result.orders[0].quantity === 1);
					
					participant.fullName = "Blood boy";
					orders = [{ meal: meal1, quantity: 5 }];
					createRegistration(userToken, event._id, cat2, orders, participant, true)
						.then(regNew => {
							Registration.findById(regOld._id)
							.populate({ path: "event", model: "event" })
							.populate({ path: "category", model: "category" })
							.populate({ path: "participant", model: "participant" })
							.then(result => {
								assert(result.participant.fullName === "Blood boy");
								assert(result.category.name === '10km');
								assert(result.orders.length === 1);
								assert(result.orders[0].quantity === 5);
								done();	
							});
							
						});	
				});
			});
	});
});
