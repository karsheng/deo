const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApparelSchema = new Schema({
	sizes: [String],
	attachmentUrl: String,
	otherDetail: String
});

module.exports = ApparelSchema;
