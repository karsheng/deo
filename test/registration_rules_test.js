const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const faker = require("faker");
const createAdmin = require("../helper/create_admin_helper");
const createUser = require("../helper/create_user_helper");
const createEvent = require("../helper/create_event_helper");
const createCategory = require("../helper/create_category_helper");
const createRegistration = require("../helper/create_registration_helper");
const updateEvent = require("../helper/update_event_helper");
const executeFakePayment = require("../helper/fake_payment_execute_helper");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const Registration = mongoose.model("registration");

describe("Registration Rules", function(done) {
	this.timeout(20000);
	var event1, event2, event3;
	var adminToken, userToken1, userToken2;
	var cat1, cat2, cat3, cat4, cat6;
	var cat5;
	var cat31;
	const participant1 = {
		fullName: "Gavin Belson",
		identityNumber: "1234567",
		nationality: "U.S.",
		countryOfResidence: "U.S.",
		gender: true,
		dateOfBirth: new Date(1957, 1, 2),
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
	
	const participant2 = {
		fullName: "Jared Donald Dunn",
		identityNumber: "7654321",
		nationality: "U.S.",
		countryOfResidence: "U.S.",
		gender: true,
		dateOfBirth: new Date(1988, 1, 2),
		email: "jared@piedpiper.com",
		phone: "0987654321",
		postcode: "99999",
		city: "San Francisco",
		state: "California",
		emergencyContact: {
			name: "Richard Hendricks",
			relationship: "soulmate",
			phone: "2347389457"
		},
		medicalCondition: {
			yes: true,
			description: "Depression"
		},
		apparelSize: "M",
		waiverDeclaration: true
	};

	beforeEach(done => {
		createAdmin("admin@deo.com", "qwerty123").then(at => {
			adminToken = at;
			Promise.all([
				createEvent(adminToken, "Event 1"),
				createEvent(adminToken, "Event 2"),
				createEvent(adminToken, "Event 3")
			]).then(events => {
				Promise.all([
					createCategory(
						adminToken,
						"5km Male 21 to 48",
						{ earlyBird: null, normal: 50 },
						true,
						21,
						48,
						1000,
						events[0],
						"RM 100",
						"run",
						5
					),
					createCategory(
						adminToken,
						"5km Female 48 and above ",
						{ earlyBird: null, normal: 50 },
						false,
						48,
						999,
						1000,
						events[0],
						"RM 100",
						"run",
						5
					),
					createCategory(
						adminToken,
						"10km Male 48 and above ",
						{ earlyBird: null, normal: 50 },
						true,
						48,
						999,
						1000,
						events[0],
						"RM 100",
						"run",
						10
					),
					createCategory(
						adminToken,
						"10km Male 18 and above exclusive",
						{ earlyBird: null, normal: 50 },
						true,
						18,
						999,
						1,
						events[0],
						"RM 100",
						"run",
						10
					),
					createCategory(
						adminToken,
						"10km Male 21 and above (closed) ",
						{ earlyBird: null, normal: 50 },
						true,
						21,
						999,
						1000,
						events[1],
						"RM 100",
						"run",
						10
					),
					createCategory(
						adminToken,
						"10km Male 21 and above (open)",
						{ earlyBird: null, normal: 50 },
						true,
						21,
						999,
						1000,
						events[0],
						"RM 100",
						"run",
						10
					),
					createCategory(
						adminToken,
						"10km Male 21 and above (open)",
						{ earlyBird: null, normal: 50 },
						true,
						21,
						999,
						1000,
						events[2],
						"RM 100",
						"run",
						10
					)
				]).then(cats => {
					cat1 = cats[0];
					cat2 = cats[1];
					cat3 = cats[2];
					cat4 = cats[3];
					cat5 = cats[4];
					cat6 = cats[5];
					cat31 = cats[6];
					Promise.all([
						updateEvent(
							adminToken,
							events[0]._id,
							"Test Event 1",
							new Date().getTime(),
							"Test Location",
							3.123,
							101.123,
							faker.lorem.paragraphs(),
							faker.image.imageUrl(),
							[cat1, cat2, cat3, cat4, cat6],
							[],
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
						),
						updateEvent(
							adminToken,
							events[1]._id,
							"Test Event 2",
							new Date().getTime(),
							"Test Location",
							3.123,
							101.123,
							faker.lorem.paragraphs(),
							faker.image.imageUrl(),
							[cat5],
							[],
							false,
							{
								address: "1 Newell Road",
								time: "11th Nov 2017, 12th Nov 2017",
								description: "collection description",
								lat: 3.11,
								lng: 101
							},
							"http:result.com/result",
							"Kuala Lumpur",
							Date.now() - 1000 * 60 * 60 * 24 * 30,
							Date.now() - 1000 * 60 * 60 * 24 * 15,
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
						),
						updateEvent(
							adminToken,
							events[2]._id,
							"Test Event 3",
							new Date().getTime(),
							"Test Location",
							3.123,
							101.123,
							faker.lorem.paragraphs(),
							faker.image.imageUrl(),
							[cat5],
							[],
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
							Date.now() - 1000 * 60 * 60 * 24 * 30,
							Date.now() - 1000 * 60 * 60 * 24 * 15,
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
						)
					]).then(updatedEvents => {
						event1 = updatedEvents[0];
						event2 = updatedEvents[1];
						event3 = updatedEvents[2];
						Promise.all([
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
								[],
								new Date(1957, 1, 2)
							),
							createUser(
								"Richard Hendricks",
								"richard@piedpiper.com",
								"qwerty123",
								true,
								"5230 Newell Road",
								"East Palo Alto",
								"Palo Alto",
								"San Francisco",
								45720,
								"U.S.",
								[],
								new Date(1988, 1, 2)
							)
						]).then(uts => {
							userToken1 = uts[0];
							userToken2 = uts[1];
							done();
						});
					});
				});
			});
		});
	});

	it("Returns error if user age does not fall within allowable age range", done => {
		request(app)
			.post(`/api/event/register/${event1._id}`)
			.set("authorization", userToken1)
			.send({
				category: cat1,
				participant: participant1,
				registerForSelf: true
			})
			.end((err, res) => {
				// participant born in 1957, age limit is 21 to 48
				// return error
				assert(res.body.message === "Not allowed to register for this category");
				done();
			});
	});

	it("Returns error if user gender does not match category gender requirement", done => {
		request(app)
			.post(`/api/event/register/${event1._id}`)
			.set("authorization", userToken1)
			.send({
				category: cat2,
				participant: participant2,
				registerForSelf: false
				
			})
			.end((err, res) => {
				// participant is male, cat2 is for female
				// return error
				assert(res.body.message === "Not allowed to register for this category");
				done();
			});
	});

	it("Returns error if user tries to register for an event and the participantLimit is met", done => {
		createRegistration(userToken1, event1._id, cat4, [], participant1, true).then(registration => {
			executeFakePayment(userToken1, registration)
			.then(payment => {
				request(app)
					.post(`/api/event/register/${event1._id}`)
					.set("authorization", userToken2)
					.send({
						category: cat4,
						participant: participant2,
						registerForSelf: true
					})
					.end((err, res) => {
						assert(
							res.body.message ===
								"Registration for this category is closed"
						);
						done();
					});
			});
				
		});
		}
	);

	it("Returns error if user tries to register for an event that is already closed", done => {
		request(app)
			.post(`/api/event/register/${event2._id}`)
			.set("authorization", userToken2)
			.send({ category: cat5, participant: participant2, registerForSelf: false })
			.end((err, res) => {
				assert(res.body.message === "Registration for this category is closed");
				done();
			});
	});

	it("Returns error if user tries to register for an event that is already passed registration deadline", done => {
		request(app)
			.post(`/api/event/register/${event3._id}`)
			.set("authorization", userToken2)
			.send({ category: cat31 })
			.end((err, res) => {
				assert(res.body.message === "Registration for this category is closed");
				done();
			});
	});
});
