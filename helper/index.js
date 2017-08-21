module.exports = {
	participant: {
		fullName: 'Gavin Belson',
		identityNumber: '1234567',
		nationality: 'U.S.',
		countryOfResidence: 'U.S.',
		gender: true,
		dateOfBirth: new Date(1988, 1, 2),
		email: 'gavin@hooli.com',
		phone: '1234567890',
		postcode: '45720',
		city: 'San Francisco',
		state: 'California',
		emergencyContact: {
			name: 'Richard Hendricks',
			relationship: 'friend',
			phone: '1234567890'
		},
		medicalCondition: {
			yes: true,
			description: 'High colestrol because of the blood boy'
		},
		apparelSize: 'L',
		waiverDeclaration: true,
		wantsPostalService: true,
		postalAddress: {
			line1: '1 Hooli Road',
			line2: 'Silicon Valley',
			line3: 'Palo Alto',
			city: 'San Francisco',
			state: 'California',
			postcode: '12345',
			country: 'United States'
		}
	},
	organizer: [
		{
			name: 'Fictional Sports Brand',
			email: 'Fictional@sportsbrand.com',
			website: 'fictionalsportsbrand.com',
			socialMedia: {
				facebook: 'facebook.com/fictionalsportsbrand',
				twitter: 'twitter.com/fictionalsportsbrand',
				instagram: 'instagram.com/fictionalsportsbrand',
				youtube: 'youtube.com/fictionalsportsbrand',
				snapchat: '@fictionalsportsbrand',
				pinterest: '@fictionalsportsbrand'
			}
		}
	],
	apparel: {
		attachmentUrl: null,
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		otherDetail: null
	},
	delivery: {
		hasDeliveryOption: true,
		postalCharges: {
			eastMalaysia: 12,
			westMalaysia: 6,
			international: 50
		}
	}
};
