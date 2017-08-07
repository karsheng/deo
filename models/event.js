const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CollectionSchema = require("./collection_schema");
const OrganizerSchema = require("./organizer_schema");
const ApparelSchema = require("./apparel_schema");

const EventSchema = new Schema({
	name: String,
	datetime: Date,
	address: String,
	lat: Number,
	lng: Number,
	description: String,
	imageUrl: String,
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: "category"
		}
	],
	meals: [
		{
			type: Schema.Types.ObjectId,
			ref: "meal"
		}
	],
	open: {
		type: Boolean
	},
	collectionInfo: [CollectionSchema],
	resultUrl: String,
	type: [String],
	stateName: String,
	earlyBirdEndDate: Date,
	registrationDeadline: Date,
	organizer: [OrganizerSchema],
	apparel: ApparelSchema
});

EventSchema.pre("save", function(next) {
	const event = this;
	_getEventTypes(event, function(err, types) {
		if (err) {
			return next(err);
		}
		event.type = types;
		next();
	});
});

function _getEventTypes(event, cb) {
	const Category = require("./category");
	let types = [];

	Category.populate(event, { path: "categories" }, function(err, result) {
		if (err) {
			return cb(err);
		}
		result.categories.map(cat => {
			if (types.indexOf(cat.type) === -1) {
				types.push(cat.type);
			}
		});
		return cb(null, types);
	});
}

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
