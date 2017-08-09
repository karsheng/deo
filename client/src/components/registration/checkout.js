import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTotalPrice, createRegistration } from '../../actions/registration_actions';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import { participantFormCompleted } from '../../helper/';
import CircularProgress from 'material-ui/CircularProgress';
import { formatDate, determinePostalCharges } from '../../helper/';
import Paper from 'material-ui/Paper';
import Stepper from './stepper';
import { updateStepper } from '../../actions/stepper_actions';
import Divider from 'material-ui/Divider';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "768px",
		margin: "auto",
		padding: "20px"		
	},
	nextBtn: {
		float: 'right'
	},
	priceCol: {
		textAlign: 'center'
	}
};

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			earlyBirdValid: false
		};
	}

	componentWillMount() {
		this.props.updateStepper(3);
		const { event_id } = this.props.match.params;
		const { selectedCategory, participant, event } = this.props;
		if (!selectedCategory) return this.props.history.push(`/registration/participant/${event_id}`);
		if (!participantFormCompleted(participant)) return this.props.history.push(`/registration/participant/${event_id}`);
		if (!event) return this.props.history.push(`/event/${event_id}`);
		
		const { earlyBirdEndDate } = event;
		
		if (earlyBirdEndDate && new Date(earlyBirdEndDate) > Date.now()) {
			this.setState({ earlyBirdValid: true });
		}

		this.props.setTotalPrice(this.getTotalPrice());
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleCheckout() {
		const { 
			event, 
			selectedCategory, 
			selectedMeals,
			participant
		} = this.props;
		
		const orders = _.values(selectedMeals);
		
		this.props.createRegistration(
			{ event, 
				category: selectedCategory,
				orders,
				participant,
				registerForSelf: participant.registerForSelf
			},
			(registration) => {
				this.props.history.push(`/registration/payment/${registration._id}`);
			});
	}

	renderCategoryPrice(category) {
		const { earlyBird, normal } = category.price;

		return this.state.earlyBirdValid ? earlyBird : normal;

	}

	getTotalPrice() {
		const {
			selectedMeals,
			selectedCategory,
			event,
			participant
		} = this.props;

		let totalPrice = this.state.earlyBirdValid ? selectedCategory.price.earlyBird : selectedCategory.price.normal;

		_.map(selectedMeals, selectedMeal => {
			totalPrice += selectedMeal.meal.price * selectedMeal.quantity;
		});
		
		if (event.delivery.hasDeliveryOption && participant.wantsPostalService) {
			totalPrice += determinePostalCharges(participant.postalAddress, event.delivery.postalCharges, function(location, charges) {
				return charges;
			});	
		}
		
		return totalPrice;
	}
	
	renderPostalCharges(event, participant) {
		if (event.delivery.hasDeliveryOption && participant.wantsPostalService) {
			return determinePostalCharges(participant.postalAddress, event.delivery.postalCharges, function(location, charges) {
				return(
					<div>
						<div className="col-xs-8">
							{`Postal charges: ${location}`}	
						</div>
						<div style={style.priceCol} className="col-xs-4">
							{charges.toFixed(2)}
						</div>
					</div>
				);				
			});
		}
	}

	renderMealNameAndPrice(selectedMeals) {
		return _.map(selectedMeals, selectedMeal => {
			return (
				<div key={selectedMeal.meal._id}>
					<div className="col-xs-8">
						{selectedMeal.meal.name + ' (RM '+ selectedMeal.meal.price.toFixed(2) + ') x ' + selectedMeal.quantity}
					</div>
					<div style={style.priceCol} className="col-xs-4">
						{(selectedMeal.meal.price * selectedMeal.quantity).toFixed(2)}
					</div>
				</div>
			);
		});
	}

	renderParticipantDetails(participant) {
		
		const postalDetails = (participant) => {
			if (participant.wantsPostalService) {
				const { postalAddress } = participant;
				return(
					<div>
						<h4>Postal Address</h4>
						<p>{postalAddress.line1}</p>
						<p>{postalAddress.line2}</p>
						<p>{postalAddress.line3}</p>
						<p>{postalAddress.city}</p>
						<p>{postalAddress.postcode}</p>
						{postalAddress.state.toLowerCase() !== "others" ? <p>{postalAddress.state}</p> : ""}
						<p>{postalAddress.country}</p>
					</div>
				);
			}	
		};
		
		return(
			<div>
				<div className="col-xs-12 col-md-6">
					<h4>Participant Details</h4>
					<p>
						Full Name: {participant.fullName}
					</p>
					<p>
						Participant Email: {participant.email}
					</p>
					<p>
						Identity Number: {participant.identityNumber}
					</p>
					<p>
						Gender: {participant.gender ? "Male" : "Female"}
					</p>
					<p>
						Nationality: {participant.nationality}
					</p>
					<p>
						Country of Residence: {participant.countryOfResidence}
					</p>
					<p>
						Phone: {participant.phone}
					</p>
					<p>
						Postcode: {participant.postcode}
					</p>
					<p>
						Apparel Size: {participant.apparelSize}
					</p>
					<p>
						Date of Birth: {formatDate(participant.dateOfBirth)}
					</p>
					<h4>Emergency Contact</h4>
					<p>
						Emergency Contact Name: {participant.emergencyContact.name}
					</p>
					<p>
						Relationship: {participant.emergencyContact.relationship}
					</p>
					<p>
						Phone: {participant.emergencyContact.phone}
					</p>
				</div>
				<div className="col-xs-12 col-md-6">
					<h4>Medical Condition</h4>
					<p>
						Medical Condition: {participant.medicalCondition.yes ? "Yes" : "No"}
					</p>
					<p>
						Description: {participant.medicalCondition.description}
					</p>
					<h4>Racepack Collection</h4>
					<p>Collection: {participant.wantsPostalService ? "by post" : "self collection"}</p>					
					{postalDetails(participant)}
				</div>
			</div>
		);
	}

	render() {
		const {
			event,
			selectedCategory,
			selectedMeals,
			participant
		} = this.props;

		if (!event) {
			return(
				<CircularProgress />
			);
		}

		return(
			<div>
				<Stepper />
				<Paper zDepth={3} style={style.paper} >
					<h2>{event.name}</h2>
					<h3>Step 4: Confirmation and Payment</h3>
					<div className="row">
						<div className="col-xs-8">
							<h4>Description</h4>
						</div>
						<div style={style.priceCol} className="col-xs-4">
							<h4>Price (RM)</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-8">
							{selectedCategory.name}
						</div>
						<div style={style.priceCol} className="col-xs-4">
							{this.renderCategoryPrice(selectedCategory).toFixed(2)}
						</div>
						{this.renderMealNameAndPrice(selectedMeals)}
						{this.renderPostalCharges(event, participant)}
					</div>
					<hr />
					<div className="row">
						<div className="col-xs-8">
							Total
						</div>
						<div style={style.priceCol} className="col-xs-4">
							{this.getTotalPrice().toFixed(2)}
						</div>
					</div>
					<br /><br />
					<div className="row">
						{this.renderParticipantDetails(participant)}
					</div>
					<br /><br /><br /><br />
					<Divider />
					<br />
					<div>
						<RaisedButton 
							label="Back"
							secondary={true}
							onTouchTap={() => this.props.history.push(`/registration/meal/${event._id}`)}
						/>
						<RaisedButton 
							label="Payment"
							primary={true}
							style={style.nextBtn}
							onTouchTap={this.handleCheckout.bind(this)}
						/>
					</div>
				</Paper>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		selectedCategory: state.registration.selectedCategory,
		selectedMeals: state.registration.selectedMeals,
		participant: state.participant
	};
}

export default connect(mapStateToProps, { setTotalPrice, createRegistration, updateStepper })(Checkout);