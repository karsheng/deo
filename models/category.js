const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: { type: String },
	price: { 
		earlyBird: Number,
		normal: Number
	},
	gender: { type: Boolean },
	ageMin: { type: Number },
	ageMax: { type: Number },
	participantLimit: { type: Number },
	event: { 
		type: Schema.Types.ObjectId,
		ref: 'event'
	},
	prize: String,
	type: String,
	distance: Number
});

CategorySchema.methods.checkEligibility = function(participant, cb) {
	const category = this;
	const age = _calculateAge(participant.dateOfBirth);
	if (age >= category.ageMin && age <= category.ageMax && participant.gender === category.gender) {
		return cb(true);
	}

	return cb(false);
}

function _calculateAge(birthday) {
  const ageDifMs = Date.now() - new Date(birthday);
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


const Category = mongoose.model('category', CategorySchema);

module.exports = Category;