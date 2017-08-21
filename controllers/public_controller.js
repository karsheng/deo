const mongoose = require('mongoose');
const Event = mongoose.model('event');
const Associate = mongoose.model('associate');

module.exports = {
	getEvent(req, res, next) {
		const { event_id } = req.params;

		Event.findById(event_id)
			.populate({ path: 'categories', model: 'category' })
			.populate({ path: 'meals', model: 'meal' })
			.then(event => {
				res.json(event);
			})
			.catch(next);
	},
	getAllOpenEvents(req, res, next) {
		Event.find({ open: true })
			.populate({ path: 'categories', model: 'category' })
			.sort({ datetime: 1 })
			.then(events => res.json(events))
			.catch(next);
	},
	getSpecificOpenEvents(req, res, next) {
		const { type } = req.query;
		const query = type === 'any' ? { open: true } : { type, open: true };

		Event.find(query)
			.populate({ path: 'categories', model: 'category' })
			.sort({ datetime: 1 })
			.then(events => res.json(events))
			.catch(next);
	},
	getAssociate(req, res, next) {
		const { associate_id } = req.params;

		Associate.findById(associate_id).then(asso => res.json(asso)).catch(next);
	},
	getAllAssociates(req, res, next) {
		Associate.find({})
			.sort({ _id: 1 })
			.then(associates => res.json(associates))
			.catch(next);
	}
};
