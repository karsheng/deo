const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApparelSchema = require('./apparel_schema');

const CollectionSchema = new Schema({
	address: String,
	time: String,
	description: String,
	lat: Number,
	lng: Number
});

module.exports = CollectionSchema;
