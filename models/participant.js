const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    fullName: String,
    identityNumber: String,
    nationality: String,
    countryOfResidence: String,
    gender: Boolean,
    dateOfBirth: Date,
    email: String,
    phone: String,
    postcode: String,
    city: String,
    state: String,
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String
    },
    medicalCondition: {
        yes: { type: Boolean, default: false },
        description: String,
    },
    apparelSize: String,
    waiverDeclaration: Boolean,
    registration: {
        type: Schema.Types.ObjectId,
        ref: 'registration'
    }
});

const Participant = mongoose.model('participant', ParticipantSchema);

module.exports = Participant;