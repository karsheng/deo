const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const createAdmin = require("../../helper/create_admin_helper");
const createCategory = require("../../helper/create_category_helper");
const createEvent = require("../../helper/create_event_helper");
const updateEvent = require("../../helper/update_event_helper");
const createMeal = require("../../helper/create_meal_helper");
const createAssociate = require("../../helper/create_associate_helper");
const faker = require("faker");

describe("Public Controller", function(done) {
	this.timeout(15000);
	var adminToken;
	var cat1, cat2, cat3, cat4, cat5, cat6;
	var meal1, meal2, meal3;
	var event1, event2, event3;

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
				Promise.all([
					createEvent(adminToken, "Test Event 1"),
					createEvent(adminToken, "Test Event 2"),
					createEvent(adminToken, "Test Event 3")
				]).then(events => {
					Promise.all([
						createCategory(
							adminToken,
							"5km",
							{ earlyBird: 40, normal: 50 },
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
							"10km",
							{ earlyBird: 50, normal: 60 },
							true,
							21,
							48,
							1000,
							events[0],
							"RM 100",
							"run",
							10
						),
						createCategory(
							adminToken,
							"half-marathon",
							{ earlyBird: 60, normal: 70 },
							true,
							21,
							48,
							1000,
							events[0],
							"RM 100",
							"run",
							21
						),
						createCategory(
							adminToken,
							"full-marathon",
							{ earlyBird: 70, normal: 80 },
							true,
							21,
							48,
							1000,
							events[0],
							"RM 100",
							"swimming",
							42
						),
						createCategory(
							adminToken,
							"5km",
							{ earlyBird: 80, normal: 90 },
							true,
							21,
							48,
							1000,
							events[1],
							"RM 100",
							"swimming",
							5
						),
						createCategory(
							adminToken,
							"10km",
							{ earlyBird: 50, normal: 60 },
							true,
							21,
							48,
							1000,
							events[1],
							"RM 100",
							"swimming",
							10
						)
					]).then(cats => {
						cat1 = cats[0];
						cat2 = cats[1];
						cat3 = cats[2];
						cat4 = cats[3];
						cat5 = cats[4];
						cat6 = cats[5];
						Promise.all([
							updateEvent(
								adminToken,
								events[0]._id,
								"Event 1",
								new Date().getTime(),
								"Desa Parkcity",
								3.1862,
								101.6299,
								faker.lorem.paragraph(),
								faker.image.imageUrl(),
								[cat1, cat2, cat3, cat4],
								[meal1, meal2, meal3],
								false,
								{
									address: "1 Newell Road",
									time: "11th Nov 2017, 12th Nov 2017",
									description: "collection description"
								},
								"http:result.com/result",
								"Kuala Lumpur",
								new Date(2017, 1, 1)
							),
							updateEvent(
								adminToken,
								events[1]._id,
								"Event 2",
								new Date(2018, 4, 4),
								"Genting Highland",
								4.1862,
								102.6299,
								faker.lorem.paragraph(),
								faker.image.imageUrl(),
								[cat5, cat6],
								[meal1],
								true,
								{
									address: "1 Newell Road",
									time: "11th Nov 2017, 12th Nov 2017",
									description: "collection description"
								},
								"http:result.com/result",
								"Kuala Lumpur",
								new Date(2017, 1, 1)
							),
							updateEvent(
								adminToken,
								events[2]._id,
								"Test Event 3",
								new Date(2017, 5, 5),
								"Some Place",
								4.1862,
								102.6299,
								faker.lorem.paragraph(),
								faker.image.imageUrl(),
								[cat1, cat2],
								[meal1],
								true,
								{
									address: "1 Road",
									time: "11th Nov 2017, 12th Nov 2017",
									description: "collection description"
								},
								"http:result.com/result",
								"Kuala Lumpur",
								new Date(2017, 1, 1)
							)
						]).then(updatedEvents => {
							event1 = updatedEvents[0];
							event2 = updatedEvents[1];
							event3 = updatedEvents[2];
							done();
						});
					});
				});
			});
		});
	});

	it("GET to /api/event/:event_id returns event info", done => {
		request(app).get(`/api/event/${event1._id}`).end((err, res) => {
			assert(res.body.name === "Event 1");
			assert(res.body.meals[0].name === "Food 1");
			assert(res.body.categories[0].name === "5km");
			assert(res.body.lat === 3.1862);
			assert(res.body.collectionInfo[0].address === "1 Newell Road");
			assert(res.body.resultUrl === "http:result.com/result");
			assert(res.body.type[0] === "run");
			assert(new Date(res.body.earlyBirdEndDate).getYear() === 117);
			done();
		});
	});

	it("GET to /api/event/open/all returns all open events sorted by date (starts with soonest event)", done => {
		request(app).get("/api/event/open/all").end((err, res) => {
			assert(res.body.length === 2);
			assert(res.body[0].name === "Test Event 3");
			assert(res.body[1].name === "Event 2");
			done();
		});
	});

	it("GET to /api/event/open with query returns all open specific events", done => {
		request(app).get("/api/event/open?type=run").end((err, res) => {
			assert(res.body.length === 1);
			assert(res.body[0].name === "Test Event 3");
			request(app).get("/api/event/open?type=swimming").end((err, res) => {
				assert(res.body.length === 1);
				assert(res.body[0].name === "Event 2");
				done();
			});
		});
	});

	it("GET to /api/associate/:associate_id returns an associate", done => {
		createAssociate(
			adminToken,
			"Adidas",
			faker.image.sports(),
			faker.image.imageUrl(),
			"Adidas Street 1",
			"Adidas City",
			"Adidas County",
			"Berlin",
			13586,
			"Germany",
			"Key sponsor"
		).then(asso => {
			request(app).get(`/api/associate/${asso._id}`).end((err, res) => {
				assert(res.body.name === "Adidas");
				assert(res.body.address2 === "Adidas City");
				assert(res.body.postcode === "13586");
				assert(res.body.country === "Germany");
				done();
			});
		});
	});

	it("GET to /api/associate/all returns all associate", done => {
		Promise.all([
			createAssociate(
				adminToken,
				"Adidas",
				faker.image.sports(),
				faker.image.imageUrl(),
				"Adidas Street 1",
				"Adidas City",
				"Adidas County",
				"Berlin",
				13586,
				"Germany",
				"Key sponsor"
			),
			createAssociate(
				adminToken,
				"Nike",
				faker.image.sports(),
				faker.image.imageUrl(),
				"Nike Street 1",
				"Nike City",
				"Nike County",
				"New York",
				13586,
				"U.S.",
				"Key sponsor 2"
			)
		]).then(associates => {
			request(app).get("/api/associate/all").end((err, res) => {
				assert(res.body.length === 2);
				assert(res.body[0].name === "Adidas");
				assert(res.body[1].name === "Nike");
				done();
			});
		});
	});
});
