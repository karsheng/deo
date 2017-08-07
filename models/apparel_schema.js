const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApparelSchema = new Schema({
    sizes: [String],
    attachmentUrl: String,
    hasDeliveryOption: {
        type: Boolean,
        default: false
    },
    postalCharges: {
        eastMalaysia: Number,
        westMalaysia: Number,
        international: Number,
        others: Number
    },
    otherDetail: String
});

module.exports = ApparelSchema;