const Category = require('../models/category');
const Event = require('../models/event');
const Meal = require('../models/meal');
const Associate = require('../models/associate');

module.exports = {
	createCategory(req, res, next) {
		const {
			name,
			price,
			gender,
			ageMin,
			ageMax,
			participantLimit,
			event,
			prize,
			type,
			distance
		} = req.body;

		const category = new Category({
			name,
			price,
			gender,
			ageMin,
			ageMax,
			participantLimit,
			event,
			prize,
			type,
			distance
		});

		category.save()
			.then(cat => res.send(cat))
			.catch(next);
	},
	removeCategory(req, res, next) {
		const { category_id } = req.params;

		Category.findByIdAndRemove(category_id)
		.then(cat => res.send(cat))
		.catch(next);
	},
	createEvent(req, res, next) {
		const { 
			name
		} = req.body;

		const event = new Event({
			name
		});

		event.save()
			.then(e => res.json(e))
			.catch(next);
	},
	updateEvent(req, res, next) {
		const { event_id } = req.params;
		const { 
			name,
			datetime,
			address,
			lat,
			lng,
			description,
			imageUrl,
			categories,
			meals,
			open,
			collectionInfo,
			resultUrl,
			stateName,
			earlyBirdEndDate,
			registrationDeadline,
			organizer,
			apparel,
			delivery
		} = req.body;
		// findByIdAndUpdate doesnt support pre hooks
		// hence use findById and save instead
		// pre 'save' hook is used to update event type
		Event.findById(event_id)
		.then(event => {
			event.name = name;
			event.datetime = datetime;
			event.address = address;
			event.lat = lat;
			event.lng = lng;
			event.description = description;
			event.imageUrl = imageUrl;
			event.categories = categories;
			event.meals = meals;
			event.open = open;
			event.collectionInfo = collectionInfo;
			event.resultUrl = resultUrl;
			event.stateName = stateName;
			event.earlyBirdEndDate = earlyBirdEndDate;
			event.registrationDeadline = registrationDeadline;
			event.organizer = organizer;
			event.apparel = apparel;
			event.delivery = delivery;
			
			event.save()
				.then(result => {
					res.json(result);
				})
				.catch(next);
		})
		.catch(next);
	},
	deleteEvent(req, res, next) {
		const { event_id } = req.params;
		
		Event.findByIdAndRemove(event_id)
			.then(removedEvent => res.send(removedEvent))
			.catch(next);
	},
	createMeal(req, res, next) {
		const { name, price, description, imageUrl } = req.body;

		const meal = new Meal({
			name,
			price,
			description,
			imageUrl
		});

		meal.save()
		.then(m => res.json(m))
		.catch(next);
	},
	getMeal(req, res, next) {
		const { meal_id } = req.params;

		Meal.findById(meal_id)
			.then(meal => res.json(meal))
			.catch(next);
	},
	getAllMeals(req, res, next) {
		Meal.find({})
			.then(meals => res.json(meals))
			.catch(next);
	},
	deleteMeal(req, res, next) {
		const { meal_id } = req.params;

		Meal.findByIdAndRemove(meal_id)
			.then(meal => res.json(meal))
			.catch(next);
	},
	createAssociate(req, res, next) {
		const {
			name,
			logo,
			imageUrl,
			address1,
			address2,
			address3,
			city,
			postcode,
			country,
			description
		} = req.body;

		const associate = new Associate({
			name,
			logo,
			imageUrl,
			address1,
			address2,
			address3,
			city,
			postcode,
			country,
			description
		});

		associate.save()
			.then(asso => res.json(asso))
			.catch(next);
	},
	updateAssociate(req, res, next) {
		const {
			name,
			logo,
			imageUrl,
			address1,
			address2,
			address3,
			city,
			postcode,
			country,
			description
		} = req.body;

		const { associate_id } = req.params;

		Associate.findByIdAndUpdate(
			associate_id,
			{
				name,
				logo,
				imageUrl,
				address1,
				address2,
				address3,
				city,
				postcode,
				country,
				description
			},
			{ new: true }
		)
			.then(asso => res.json(asso))
			.catch(next);
	},
	deleteAssociate(req, res, next) {
		const { associate_id } = req.params;

		Associate.findByIdAndRemove(associate_id)
			.then(asso => res.json(asso))
			.catch(next);
	}
};