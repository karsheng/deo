const mongoose = require("mongoose");
const createAdmin = require("./helper/create_admin_helper");
const createEvent = require("./helper/create_event_helper");
const createCategory = require("./helper/create_category_helper");
const createMeal = require("./helper/create_meal_helper");
const updateEvent = require("./helper/update_event_helper");
const createUser = require("./helper/create_user_helper");
const updateUser = require("./helper/update_user_helper");
const faker = require("faker");
const data = require("./helper/");

createAdmin("admin@deoevents.com", "qwerty12345").then(adminToken => {
	Promise.all([
		createEvent(adminToken, "Event 0"),
		createEvent(adminToken, "Event 1"),
		createEvent(adminToken, "Event 2"),
		createEvent(adminToken, "Event 3"),
		createEvent(adminToken, "Event 4"),
		createEvent(adminToken, "Event 5"),
		createEvent(adminToken, "Event 6"),
		createEvent(adminToken, "Event 7"),
		createEvent(adminToken, "Event 8"),
		createEvent(adminToken, "Event 9")
	]).then(events => {
		Promise.all([
			createCategory(
				adminToken,
				"10km Run Male 21 and above",
				{ earlyBird: 50, normal: 60 },
				true,
				21,
				999,
				1,
				events[0],
				"RM 300",
				"run",
				10
			),
			createCategory(
				adminToken,
				"10km Run Female 21 and above",
				{ earlyBird: 50, normal: 60 },
				false,
				21,
				999,
				1000,
				events[0],
				"RM 300",
				"run",
				10
			),
			createCategory(
				adminToken,
				"Male (21-30 years old) Cycling 42km",
				{ earlyBird: null, normal: 60 },
				true,
				21,
				30,
				1000,
				events[1],
				"RM 100",
				"cycling",
				42
			),
			createCategory(
				adminToken,
				"21km Male 21 and above",
				{ earlyBird: 50, normal: 60 },
				true,
				21,
				999,
				1000,
				events[2],
				"RM 100",
				"run",
				21
			),
			createCategory(
				adminToken,
				"42km Female 21 and above",
				{ earlyBird: null, normal: 70 },
				false,
				21,
				999,
				1000,
				events[3],
				"RM 100",
				"run",
				42
			),
			createCategory(
				adminToken,
				"Triathlon Male 21 and above",
				{ earlyBird: 50, normal: 60 },
				true,
				21,
				999,
				1000,
				events[4],
				"RM 100",
				"multisports",
				42
			),
			createCategory(
				adminToken,
				"5km Female 21 and above",
				{ earlyBird: 50, normal: 60 },
				false,
				21,
				999,
				1000,
				events[5],
				"RM 100",
				"run",
				5
			),
			createCategory(
				adminToken,
				"5km Male 21 and above",
				{ earlyBird: null, normal: 60 },
				true,
				21,
				999,
				1000,
				events[6],
				"RM 100",
				"swimming",
				5
			)
		]).then(cats => {
			Promise.all([
				createMeal(
					adminToken,
					"Pasta",
					15.9,
					faker.lorem.paragraphs(),
					"https://verygoodrecipes.com/images/blogs/the-iowa-housewife/from-the-garden-iowa-corn-pasta-salad.160x120.jpg"
				),
				createMeal(
					adminToken,
					"Nasi Lemak",
					8.9,
					faker.lorem.paragraphs(),
					"https://verygoodrecipes.com/images/blogs/the-fuss-free-chef/nasi-lemak-the-full-glory.160x120.jpg"
				),
				createMeal(
					adminToken,
					"Chicken Rice",
					9.9,
					faker.lorem.paragraphs(),
					"https://verygoodrecipes.com/images/blogs/awesome-cuisine/hainanese-chicken-rice-singapore-chicken-rice.160x120.jpg"
				)
			]).then(meals => {
				Promise.all([
					updateEvent(
						adminToken,
						events[0]._id,
						"Desa Parkcity 10k Run",
						new Date(2017, 8, 8),
						"Desa Parkcity",
						3.1862,
						101.6299,
						faker.lorem.paragraphs(),
						"data:image/jpeg;base64,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",
						[cats[0], cats[1]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Kuala Lumpur",
						Date.now() + 1000 * 60 * 60 * 24 * 5,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[1]._id,
						"HSBC Cycling",
						new Date(2017, 9, 9),
						"Port Dickson",
						2.5225,
						101.7963,
						faker.lorem.paragraphs(),
						"https://3.bp.blogspot.com/-231FAiRwjxU/WIIySk9ZXYI/AAAAAAAAkwE/uR-HkdysJyUitzIuc2xMvluIcpxecKiSwCLcB/s1600/HSBC_British%2BCycling_sm.jpg",
						[cats[2]],
						[],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Negeri Sembilan",
						null,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[2]._id,
						"Penang Mag Run",
						new Date(2017, 10, 10),
						"Penang Bridge",
						5.3530,
						100.3530,
						faker.lorem.paragraphs(),
						"http://jadwalevent.web.id/wp-content/uploads/2016/10/MAG-RUN-2016-768x380.jpg",
						[cats[3]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Penang",
						Date.now() - 1000 * 60 * 60 * 24 * 5,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[3]._id,
						"UM 5k Sprint",
						new Date(2017, 11, 11),
						"UM",
						3.1201,
						101.6545,
						faker.lorem.paragraphs(),
						"http://www-static2.spulsecdn.net/pics/00/00/67/64/676447_1_O.jpg",
						[cats[4]],
						[],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Kuala Lumpur",
						null,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[4]._id,
						"Ultimate Triathlon",
						new Date(2018, 1, 1),
						"Port Dickson",
						2.5225,
						101.7963,
						faker.lorem.paragraphs(),
						"https://goactive.online/wp-content/uploads/2017/05/8080-sogod-2017-768x380.jpg",
						[cats[5]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Negeri Sembilan",
						Date.now() + 1000 * 60 * 60 * 24 * 5,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[5]._id,
						"Event 6",
						new Date(2018, 2, 2),
						"Venue 6",
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[6]],
						[],
						false,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Johor",
						Date.now() - 1000 * 60 * 60 * 24 * 5,
						Date.now() + 1000 * 60 * 60 * 24 * 50,
						data.organizer,
						data.apparel,
						data.delivery
					),
					updateEvent(
						adminToken,
						events[6]._id,
						"We Swim Tioman",
						new Date(2017, 9, 9),
						"Pulau Tioman",
						2.7902,
						104.1698,
						faker.lorem.paragraphs(),
						"http://www.su-neusiedl.at/fileadmin/user_upload/news/Hessheimer_web.jpg",
						[cats[7]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: "Collection Venue 1",
							time: "June 17th from 9 to 6pm",
							description: "Please bring along your IC and registration id",
							lat: 9,
							lng: 108
						},
						"https:result/url",
						"Pahang",
						null,
						Date.now() + 1000 * 60 * 60 * 24 * 30,
						data.organizer,
						data.apparel,
						data.delivery
					)
				]).then(updatedEvents => {
					createUser(
						"Gavin Belson",
						"gavin@hooli.com",
						"qwerty123"
					).then(userToken => {
						updateUser(
							userToken,
							"Gavin Belson",
							"Gavin Belson",
							"1234567890",
							true,
							"ABC12345",
							"United States",
							"United States",
							"San Francisco",
							"12345",
							"California",
							data.participant.emergencyContact,
							data.participant.medicalCondition,
							["running", "cycling", "full-marathon"],
							new Date(1968, 1, 1),
							data.participant.postalAddress
						).then(result => {
							console.log("done seeding");
							process.exit();	
						});
					});
				});
			});
		});
	});
});
