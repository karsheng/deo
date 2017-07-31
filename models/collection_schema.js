const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
	address: String,
	time: String,
	description: String,
	lat: Number,
	lng: Number
});

module.exports = CollectionSchema;