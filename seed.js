const mongoose = require('mongoose');
const createAdmin = require('./helper/create_admin_helper');
const createEvent = require('./helper/create_event_helper');
const createCategory = require('./helper/create_category_helper');
const createMeal = require('./helper/create_meal_helper');
const updateEvent = require('./helper/update_event_helper');
const createUser = require('./helper/create_user_helper');
const createRegistration = require('./helper/create_registration_helper');
const faker = require('faker');


createAdmin('admin@deoevents.com', 'qwerty12345')
.then(adminToken => {
	Promise.all([
		createEvent(adminToken, 'Event 1'),
		createEvent(adminToken, 'Event 2'),
		createEvent(adminToken, 'Event 3'),
		createEvent(adminToken, 'Event 4'),
		createEvent(adminToken, 'Event 5'),
		createEvent(adminToken, 'Event 6'),
		createEvent(adminToken, 'Swimming Event'),
	])
	.then(events => {
		Promise.all([
			createCategory(
				adminToken,
				'10km Male 21 and above',
				50,
				true,
				21,
				999,
				1000,
				events[0],
				'RM 100',
				'run',
				10
			),
			createCategory(
				adminToken,
				'10km Female 21 and above',
				50,
				false,
				21,
				999,
				1000,
				events[0],
				'RM 200',
				'run',
				10
			),
			createCategory(
				adminToken,
				'21km Female 21 and above',
				50,
				false,
				21,
				999,
				1000,
				events[1],
				'RM 100',
				'run',
				21
			),
			createCategory(
				adminToken,
				'21km Male 21 and above',
				50,
				true,
				21,
				999,
				1000,
				events[2],
				'RM 100',
				'run',
				21
			),
			createCategory(
				adminToken,
				'42km Female 21 and above',
				50,
				false,
				21,
				999,
				1000,
				events[3],
				'RM 100',
				'run',
				42
			),
			createCategory(
				adminToken,
				'42km Male 21 and above',
				50,
				true,
				21,
				999,
				1000,
				events[4],
				'RM 100',
				'run',
				42
			),
			createCategory(
				adminToken,
				'5km Female 21 and above',
				50,
				false,
				21,
				999,
				1000,
				events[5],
				'RM 100',
				'run',
				5
			),
			createCategory(
				adminToken,
				'5km Male 21 and above',
				50,
				true,
				21,
				999,
				1000,
				events[5],
				'RM 100',
				'swimming',
				5
			)
		])
		.then(cats => {
			Promise.all([
				createMeal(
					adminToken,
					'Meal 1',
					9.90,
					faker.lorem.paragraphs(),
					faker.image.imageUrl()
				),
				createMeal(
					adminToken,
					'Meal 2',
					19.90,
					faker.lorem.paragraphs(),
					faker.image.imageUrl()
				),
				createMeal(
					adminToken,
					'Meal 3',
					29.90,
					faker.lorem.paragraphs(),
					faker.image.imageUrl()
				)
			])
			.then(meals => {
				Promise.all([
					updateEvent(
						adminToken,
						events[0]._id,
						'Event 1',
						new Date(2017, 8, 8),
						'Venue 1',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[0], cats[1]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Kuala Lumpur'
					),
					updateEvent(
						adminToken,
						events[1]._id,
						'Event 2',
						new Date(2017, 9, 9),
						'Venue 2',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[2]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Kuala Lumpur'
					),
					updateEvent(
						adminToken,
						events[2]._id,
						'Event 3',
						new Date(2017, 10, 10),
						'Venue 3',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[3]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Johor'
					),
					updateEvent(
						adminToken,
						events[3]._id,
						'Event 4',
						new Date(2017, 11, 11),
						'Venue 4',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[4]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Johor'
					),
					updateEvent(
						adminToken,
						events[4]._id,
						'Event 5',
						new Date(2018, 1, 1),
						'Venue 5',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[5]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Kuala Lumpur'
					),
					updateEvent(
						adminToken,
						events[5]._id,
						'Event 6',
						new Date(2018, 2, 2),
						'Venue 6',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[6]],
						[meals[0], meals[1], meals[2]],
						false,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Johor'
					),
					updateEvent(
						adminToken,
						events[6]._id,
						'Swimming Event',
						new Date(2017, 9, 9),
						'Venue 7',
						3.013,
						101.325,
						faker.lorem.paragraphs(),
						faker.image.imageUrl(),
						[cats[7]],
						[meals[0], meals[1], meals[2]],
						true,
						{
							address: 'Collection Venue 1',
							time: 'June 17th from 9 to 6pm',
							description: 'Please bring along your IC and registration id'
						},
						'https:result/url',
						'Kuala Lumpur'
					)
				])
				.then(updatedEvents => {
					createUser(
						'Gavin Belson',
						'gavin@hooli.com',
						'qwerty123',
						true,
						'100 Hooli Road',
						'Palo Alto',
						'Silicon Valley',
						'San Francisco',
						12345,
						'U.S.',
						['5km', '10km', 'Half-marathon', 'Full-marathon'],
						new Date(1957, 1, 1)
					)
					.then(userToken => {
						createRegistration(
							userToken,
							events[0]._id,
							cats[0]
						)
						.then(reg => {
							console.log('done seeding');
							process.exit();
						});
					});
				});
			});
		});
	});
});