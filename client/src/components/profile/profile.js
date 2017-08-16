import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import { formatDate } from '../../helper/';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Progress from '../progress';

const style = {
	card: {
		maxWidth: "768px",
		margin: "30px auto"
	},
	paper: {
		height: '100%',
		width: '100%',
		margin: '0 auto',
		textAlign: 'center',
		display: 'inline-block'
	},
	chip: {
		margin: '4px auto'
	},
	cardActions: {
		textAlign: 'center'
	},
};


class UserProfile extends Component {
	renderUserInterests(interests) {
		return interests.map((interest) => {
			return(
				<Chip style={style.chip} key={interest}>{interest}</Chip>
			);
		});
	}
	
	renderMedicalCondition(medicalCondition) {
		if (medicalCondition) {
			return(
				<div>
					<h3>Medical Condition</h3>
					<div className="row">
						<span className="col-xs-12 col-md-4">Description:</span>
						<strong className="col-xs-12 col-md-8">{medicalCondition.yes === false ? "No medical condition" : medicalCondition.description || "Not provided"}</strong>
					</div>
				</div>
			);
		}
		
		return <p>Medical condition details not provided.</p>;
	}
	
	renderEmergencyContact(emergencyContact) {
		if (emergencyContact) {
			return(
				<div>
					<h3>Emergency Contact</h3>
					<div className="row">
						<span className="col-xs-12 col-md-4">Name:</span>
						<strong className="col-xs-12 col-md-8">{emergencyContact.name || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Relationship:</span>
						<strong className="col-xs-12 col-md-8">{emergencyContact.relationship || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Phone:</span>
						<strong className="col-xs-12 col-md-8">{emergencyContact.phone || 'Not provided' }</strong>
					</div>
				</div>
			);
		}
		
		return <p>Emergency contact details not provided.</p>;
	}
	
	renderUserDetails(user) {
		if (user) {
			return( 
				<div className="row">
					<span className="col-xs-12 col-md-4">Full Name:</span>
					<strong className="col-xs-12 col-md-8">{user.fullName || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Email:</span>
					<strong className="col-xs-12 col-md-8">{user.email || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Identity Number:</span>
					<strong className="col-xs-12 col-md-8">{user.identityNumber || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Gender:</span>
					<strong className="col-xs-12 col-md-8">{user.gender === undefined ? 'Not provided' : (user.gender === true ? 'Male' : 'Female') }</strong>
					<span className="col-xs-12 col-md-4">Nationality:</span>
					<strong className="col-xs-12 col-md-8">{user.nationality || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Country of Residence:</span>
					<strong className="col-xs-12 col-md-8">{user.countryOfResidence || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Phone:</span>
					<strong className="col-xs-12 col-md-8">{user.phone || 'Not provided' }</strong>
					<span className="col-xs-12 col-md-4">Date of Birth:</span>
					<strong className="col-xs-12 col-md-8">{formatDate(user.dateOfBirth) || 'Not provided' }</strong>
				</div>
			);	
		}
		return null;
	}
	
	renderPostalAddress(postalAddress) {
		if (postalAddress) {
		return(
				<div>
					<h3>Postal Address</h3>
					<div className="row">
						<span className="col-xs-12 col-md-4">Line 1:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.line1 || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Line 2:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.line2 || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Line 3:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.line3 || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Postcode:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.postcode || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">City:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.city || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">State:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.state || 'Not provided' }</strong>
						<span className="col-xs-12 col-md-4">Country:</span>
						<strong className="col-xs-12 col-md-8">{postalAddress.country || 'Not provided' }</strong>
					</div>
				</div>
			);	
		}
		return <p>Postal address not provided.</p>;	
	}
	
	render() {
		const { user } = this.props;
		if (!user) return <Progress />;
		return(
			<div>
    		<Card style={style.card}>
    			<CardTitle title={`${user.name}'s profile`}/>
				<CardText>
					{this.renderUserDetails(user)}
					<br />
					{this.renderPostalAddress(user.postalAddress)}
					<br />
					{this.renderEmergencyContact(user.emergencyContact)}
					<br />
					{this.renderMedicalCondition(user.medicalCondition)}
				</CardText>
				<br />
				<br />
				<CardActions style={style.cardActions}>
					<RaisedButton label="Edit Profile" 
						onTouchTap={() => this.props.history.push('/profile/edit')}
					/>
				</CardActions>
    		</Card>
    		<br/><br/><br/><br/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.profile
	};
}

export default connect(mapStateToProps)(UserProfile);