import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTotalPrice, createRegistration } from '../../actions/registration_actions';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { participantFormCompleted } from '../../helper/';
import CircularProgress from 'material-ui/CircularProgress';
import { formatDate } from '../../helper/';
import Paper from 'material-ui/Paper';

const style = {
	backBtn: {
		marginRight: '24px'
	},
	paper: {
		padding: 15,
	}
}

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			earlyBirdValid: false
		}
	}

	componentWillMount() {
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
			selectedCategory
		} = this.props;

		let totalPrice = this.state.earlyBirdValid ? selectedCategory.price.earlyBird : selectedCategory.price.normal

		_.map(selectedMeals, selectedMeal => {
			totalPrice += selectedMeal.meal.price * selectedMeal.quantity;
		});

		return totalPrice;
	}

	renderMealNameAndPrice(selectedMeals) {
		return _.map(selectedMeals, selectedMeal => {
			return (
				<div key={selectedMeal.meal._id}>
					<div className="col-xs-9">
						{selectedMeal.meal.name + ' (RM '+ selectedMeal.meal.price + ') x ' + selectedMeal.quantity}
					</div>
					<div className="col-xs-3">
						{selectedMeal.meal.price * selectedMeal.quantity}
					</div>
				</div>
			);
		});
	}

	renderParticipantDetails(participant) {
		return(
			<Paper style={style.paper} zDepth={3}>
				<h3>Participant Details</h3>
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
				<h3>Emergency Contact</h3>
				<p>
					Emergency Contact Name: {participant.emergencyContact.name}
				</p>
				<p>
					Relationship: {participant.emergencyContact.relationship}
				</p>
				<p>
					Phone: {participant.emergencyContact.phone}
				</p>
				<h3>Medical Condition</h3>
				<p>
					Medical Condition: {participant.medicalCondition.yes ? "Yes" : "No"}
				</p>
				<p>
					Description: {participant.medicalCondition.description}
				</p>
			</Paper>
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
				<h2>{event.name}</h2>
				<h3>Step 3: Confirmation and Payment</h3>
				<div className="row">
					<div className="col-xs-9">
						Description
					</div>
					<div className="col-xs-3">
						Price (RM)
					</div>
				</div>
				<div className="row">
					<div className="col-xs-9">
						{selectedCategory.name}
					</div>
					<div className="col-xs-3">
						{this.renderCategoryPrice(selectedCategory)}
					</div>
					{this.renderMealNameAndPrice(selectedMeals)}
				</div>
				<hr />
				<div className="row">
					<div className="col-xs-9">
						Total
					</div>
					<div className="col-xs-3">
						{this.getTotalPrice()}
					</div>
				</div>
				<br />
				<div className="col-xs-12">
					{this.renderParticipantDetails(participant)}
				</div>
				<br />
				<RaisedButton 
					label="Back"
					secondary={true}
					style={style.backBtn}
					onTouchTap={() => this.props.history.push(`/registration/meal/${event._id}`)}
				/>
				<RaisedButton 
					label="Payment"
					primary={true}
					onTouchTap={this.handleCheckout.bind(this)}
				/>
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
	}
}

export default connect(mapStateToProps, { setTotalPrice, createRegistration })(Checkout);