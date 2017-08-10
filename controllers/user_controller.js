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
		
		// TODO: Check waiver declaration
		checkRegistrationEligibity(participant, category, next, function(errMessage, isEligible) {
			if (isEligible) {
				// check if user already has an unpaid registration		
				Registration.findOne({ user, paid: 'false' })
				.then(unpaidReg => {
					if (unpaidReg) {
						// if there is an unpaid registration, update the registration
						// info of the registration document and update participant info
						unpaidReg.category = category;
						unpaidReg.orders = orders;
						unpaidReg.event = event_id;
						
						Participant.findByIdAndUpdate(unpaidReg.participant, participant)
							.then(updatedParticipant => {
								unpaidReg.save()
								.then(reg => res.json(reg))
								.catch(next);
							})
							.catch(next);
						
					} else {
						// if no unpaid registration, create a new registration document
						// and update participant info
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
					}
				})
				.catch(next);
				
			} else {
				res.status(422).send(errMessage);
			}
		});
	}
};