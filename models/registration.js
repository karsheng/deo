const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = require("./order_schema");
const Event = require("./event");
const Category = require("./category");
const Meal = require("./meal");
const Participant = require("./participant");

const RegistrationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "user"
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "event"
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "category"
		},
		orders: [OrderSchema],
		totalBill: Number,
		paid: {
			type: Boolean,
			default: false
		},
		registerForSelf: {
			type: Boolean,
			default: false
		},
		participant: {
			type: Schema.Types.ObjectId,
			ref: "participant"
		}
	},
	{ timestamps: { createdAt: "timeRegistered" } }
);

RegistrationSchema.statics.checkStatus = function(category, cb) {
	this.find({ category, paid: true }).exec(function(err, regs) {
		if (err) return cb(err);

		if (regs.length < category.participantLimit && category.event.open && category.event.registrationDeadline > Date.now() ) {
			return cb(null, true);
		} else {
			return cb(null, false);
		}
	});
};

RegistrationSchema.pre("save", function(next) {
	var reg_bill = 0,
		orders_bill = 0,
		postal_bill = 0;

	const registration = this;

	Category.populate(this, { path: "category" }, function(err, reg) {
		if (err) { next(err) }
		Event.populate(reg, { path: "event" }, function(err, reg) {
			if (err) { next(err) }
			Participant.populate(reg, { path: "participant" }, function(err, reg) {
				if (err) { next(err) }
			
				const { event, participant, orders, category } = reg;
				
				// this part calculates fee for category registration
				// and determine if early bird price is valid
				if (
					event.earlyBirdEndDate &&
					event.earlyBirdEndDate > Date.now()
				) {
					reg_bill += category.price.earlyBird;
				} else {
					reg_bill += category.price.normal;
				}
	
				// this part calculates fee for postal
				if (participant.wantsPostalService) {
					const { postalCharges } = event.apparel;
					
					postal_bill = determinePostalCharges(participant.postalAddress, postalCharges);
				}
				
				
				// if there are orders
				// this part calculates any fee for meal orders
				if (orders.length > 0) {
					Meal.populate(reg, { path: "orders.meal" }, function(err, reg) {
						if (err) { next(err) }
						orders.map(order => {
							orders_bill += order.meal.price * order.quantity;
						});
						registration.totalBill = reg_bill + orders_bill + postal_bill;
						next();
					});
				} else {
					// if no orders, add only registration bill and postal bill	
					registration.totalBill = reg_bill + postal_bill;
					next();
				}
			});
		});
	});
});

const Registration = mongoose.model("registration", RegistrationSchema);

module.exports = Registration;

function determinePostalCharges(postalAddress, eventPostalCharges) {
	if (postalAddress.country.toLowerCase() === "malaysia") {
		if (postalAddress.state.toLowerCase() === 'sabah' || postalAddress.state.toLowerCase() === 'sarawak' || postalAddress.state.toLowerCase() === 'labuan') {
			return eventPostalCharges.eastMalaysia;
		} else {
			return eventPostalCharges.westMalaysia;
		}
	} else {
		return eventPostalCharges.international;
	}
}
