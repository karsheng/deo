const Registration = require('../models/registration');
const Category = require('../models/category');
const Participant = require('../models/participant');

function checkRegistrationEligibity(participant, category, next, cb) {
	Category.findById(category._id)
		.populate({ path: 'event', model: 'event' })
		.then(category => {
			Registration.checkStatus(category, function(err, isOpen) {
				if (err) return next(err);
				if (isOpen) {
					category.checkEligibility(participant, function(isEligible) {
						if (isEligible) return cb(null, true);
						return cb({ message: 'Not allowed to register for this category' }, false);
					});
				} else {
					return cb({ message: 'Registration for this category is closed' }, false);
				}
			});
		})
		.catch(next);
}

module.exports = {
	getRegistrationInfo(req, res, next) {
		const { registration_id } = req.params;
		const { user } = req;

		Registration
		.findOne({ _id: registration_id, user })
		.populate({ path: 'category', model: 'category' })
		.populate({ path: 'orders.meal', model: 'meal' })
		.populate({ path: 'event', model: 'event' })
		.populate({ path: 'participant', model: 'participant' })
		.then(reg => {
			res.json(reg);
		})
		.catch(next);
	},
	registerForEvent(req, res, next) {
		const { event_id } = req.params;
		const { user } = req;
		const { category, orders, participant, registerForSelf } = req.body;

		checkRegistrationEligibity(participant, category, next, function(errMessage, isEligible) {
			if (isEligible) {
				// TODO: Check waiver declaration
				const p = new Participant(participant);
				const registration = new Registration({
							user: user._id,
							event: event_id,
							category,
							orders,
							participant: p,
							registerForSelf
						});
				p.registration = registration._id;
				Promise.all([
					p.save(),
					registration.save()
				])
				.then(results => res.json(results[1]))
				.catch(next);
				
			} else {
				res.status(422).send(errMessage);
			}
		});
	}
}