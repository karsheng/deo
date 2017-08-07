module.exports = {
    participant:{
		fullName: "Gavin Belson",
		identityNumber: "1234567",
		nationality: "U.S.",
		countryOfResidence: "U.S.",
		gender: true,
		dateOfBirth: new Date(1988, 1, 2),
		email: "gavin@hooli.com",
		phone: "1234567890",
		postcode: "45720",
		city: "San Francisco",
		state: "California",
		emergencyContact: {
			name: "Richard Hendricks",
			relationship: "friend",
			phone: "1234567890"
		},
		medicalCondition: {
			yes: true,
			description: "High colestrol because of the blood boy"
		},
		apparelSize: "L",
		waiverDeclaration: true
	},
	organizer: [{
		name: "Fictional Sports Brand",
		email: "Fictional@sportsbrand.com",
		website: "fictionalsportsbrand.com",
		socialMedia: {
			facebook: "facebook.com/fictionalsportsbrand",
			twitter: "twitter.com/fictionalsportsbrand",
			instagram: "instagram.com/fictionalsportsbrand",
			youtube: "youtube.com/fictionalsportsbrand",
			snapchat: "@fictionalsportsbrand",
			pinterest: "@fictionalsportsbrand"
		}
	}],
	apparel: {
		attachmentUrl: null,
		sizes: ["XS", "S", "M", "L", "XL"],
		hasDeliveryOption: true,
		postalCharges: {
			eastMalaysia: 6,
			westMalaysia: 12,
			international: 50
		},
		otherDetail: null
	}
	
};