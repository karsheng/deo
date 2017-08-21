const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizerSchema = new Schema({
	name: String,
	email: String,
	website: String,
	socialMedia: {
		facebook: String,
		twitter: String,
		instagram: String,
		youtube: String,
		snapchat: String,
		pinterest: String
	}
});

module.exports = OrganizerSchema;
