import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { connect } from "react-redux";
import * as participant_actions from "../../actions/participant_actions";
import { updateStepper } from '../../actions/stepper_actions';
import { fetchEvent } from "../../actions/event_actions";
import { COUNTRIES, STATESNAME } from "../../constants";
import CircularProgress from "material-ui/CircularProgress";
import Stepper from './stepper';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {
	renderMenuItem,
	renderRadioGroup,
	renderSelectField,
	renderDatePicker,
	renderField,
	renderTextarea
} from "../../helper/";

const style = {
	nextBtn: {
		float: "right"
	},
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "768px",
		margin: "auto",
		padding: "20px"
	}
};

class ParticipantForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wantsPostalService: false
		};
	}
	componentWillMount() {
		this.props.updateStepper(0);
		const { event_id } = this.props.match.params;
		this.props.fetchEvent(event_id, () => {
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);		
		if (this.props.initialValues.wantsPostalService) {
			this.setState({ wantsPostalService: true});
		}
	}
	
	handleFormSubmit(formProps) {
		const participant = { ...formProps };
		const { event_id } = this.props.match.params;
		
		if (participant.wantsPostalService === true) {
			participant.postalAddress = {
				line1: formProps.line1,
				line2: formProps.line2,
				line3: formProps.line3,
				city: formProps.postalCity,
				postcode: formProps.postalPostcode,
				state: formProps.postalState,
				country: formProps.postalCountry
			};
		}
		
		participant.emergencyContact = {
			name: formProps.emergencyContactName,
			relationship: formProps.relationship,
			phone: formProps.emergencyContactPhone
		};
		
		participant.medicalCondition = {
			yes: formProps.withMedicalCondition,
			description: formProps.medicalConditionDescription
		};
		
		this.props.updateParticipantInfo(participant);
		this.props.history.push(`/registration/category/${event_id}`);
	}


	handleRadioChange(onChange, value) {
		onChange(value);
		if (value === true) {
			this.setState({ wantsPostalService: true });	
		} else {
			this.setState({ wantsPostalService: false });	
		}
	}
	
	renderDeliveryRadioGroup = ({ input, meta: { touched, error }, ...rest }) => {
	  return(
	    <div>
	      <RadioButtonGroup
	        {...input}
	        {...rest}
	        valueSelected={input.value}
	        onChange={(event, value) => this.handleRadioChange(input.onChange, value) }
	      />
	      <div className="error-text">{renderErrorText(touched, error)}</div>
	    </div>
	  );
	}

	renderRacePackDelivery(delivery) {
		if (delivery.hasDeliveryOption) {
			return(
				<div>
					<h3>Racepack Delivery</h3>
					<p>Delivery by post?</p>
					<Field name="wantsPostalService" component={this.renderDeliveryRadioGroup}>
						<RadioButton value={true} label="yes" />
						<RadioButton value={false} label="self collection" />
					</Field>
					<br /><br />
					<h3 style={{ margin: 0 }}>Postal Address</h3>
					<div>
						<Field
							label="Line 1"
							type="text"
							name="line1"
							disabled={!this.state.wantsPostalService}
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Line 2"
							type="text"
							name="line2"
							disabled={!this.state.wantsPostalService}
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Line 3"
							type="text"
							name="line3"
							disabled={!this.state.wantsPostalService}
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="City"
							type="text"
							name="postalCity"
							disabled={!this.state.wantsPostalService}
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Postcode"
							type="text"
							name="postalPostcode"
							disabled={!this.state.wantsPostalService}
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="State"
							type="text"
							name="postalState"
							disabled={!this.state.wantsPostalService}
							component={renderSelectField}
						>
							{renderMenuItem(STATESNAME)}
						</Field>
					</div>
					<div>
						<Field
							label="Country"
							name="postalCountry"
							disabled={!this.state.wantsPostalService}
							component={renderSelectField}
						>
							{renderMenuItem(COUNTRIES)}
						</Field>
					</div>
				</div>
			);
		}
	}
	

	render() {
		const { event, handleSubmit, reset, submitting } = this.props;
		// TODO: change medical condition description to textarea
		if (!event) {	
			return <CircularProgress />;
		}

		return (
			<div>
				<Stepper />
				<Paper style={style.paper} zDepth={3} >
					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<h2>{event.name}</h2>
						<h3>Step 1: Participant Info</h3>
						<div className="row">
							<div className="col-xs-12 col-md-6">
							<p>Are you registering for yourself?</p>
							<Field name="registerForSelf" component={renderRadioGroup}>
								<RadioButton value={true} label="yes" />
								<RadioButton value={false} label="others" />
							</Field>
							<Field
								label="Full Name (as per IC or passport)"
								type="text"
								name="fullName"
								component={renderField}
							/>
							<br />
							<Field
								label="Participant Email"
								type="text"
								name="email"
								component={renderField}
							/>
							<br />
							<Field
								label="Identity Number (IC or passport)"
								type="text"
								name="identityNumber"
								component={renderField}
							/>
							<br />
							<p>Gender:</p>
							<Field name="gender" component={renderRadioGroup}>
								<RadioButton value={true} label="male" />
								<RadioButton value={false} label="female" />
							</Field>
							<br />
							<Field
								label="Nationality"
								name="nationality"
								component={renderSelectField}
							>
								{renderMenuItem(COUNTRIES)}
							</Field>
							<br />
							<Field
								label="Country of Residence"
								name="countryOfResidence"
								component={renderSelectField}
							>
								{renderMenuItem(COUNTRIES)}
							</Field>
							<br />
							<Field
								label="Phone Number"
								type="text"
								name="phone"
								component={renderField}
							/>
							<br />
							<Field
								label="Postcode"
								type="text"
								name="postcode"
								component={renderField}
							/>
							<br />
							<Field
								label="Apparel Size"
								type="text"
								name="apparelSize"
								component={renderSelectField}
							>
								{renderMenuItem(event.apparel.sizes)}
							</Field>
							<br />
							<p>Date of birth:</p>
							<Field
								label="Date of Birth"
								hintText="Date of Birth"
								name="dateOfBirth"
								component={renderDatePicker}
							/>
							<br />
								<h3>Emergency Contact</h3>
								<Field
									label="Name"
									type="text"
									name="emergencyContactName"
									component={renderField}
								/>
								<br />
								<Field
									label="Relationship"
									type="text"
									name="relationship"
									component={renderField}
								/>
								<br />
								<Field
									label="Phone"
									type="text"
									name="emergencyContactPhone"
									component={renderField}
								/>
								<br />
							</div>
							<div className="col-xs-12 col-md-6">
								<h3>Medical Condition</h3>
								<Field name="withMedicalCondition" component={renderRadioGroup}>
									<RadioButton value={true} label="yes" />
									<RadioButton value={false} label="no" />
								</Field>
								<br />
								<Field
									label="Description"
									type="text"
									name="medicalConditionDescription"
									component={renderTextarea}
								/>
								<br />
								{this.renderRacePackDelivery(event.delivery)}
							</div>
						</div>
						<br /><br /><br /><br />
						<Divider />
						<br />
						<div>
							<RaisedButton
								label="Back"
								secondary={true}
								onTouchTap={() =>
									this.props.history.push(
										`/event/${this.props.match.params.event_id}`
									)}
							/>
							<RaisedButton
								type="submit"
								label="Next"
								style={style.nextBtn}
								disabled={submitting}
								primary={true}
							/>
						</div>
					</form>
				</Paper>
				<br />
			</div>
		);
	}
}

function validate(formProps) {
	const errors = {};
	const { wantsPostalService } = formProps;
	
	if (formProps.registerForSelf !== true && formProps.registerForSelf !== false) {
		errors.registerForSelf = "Please tell us if you're registering for yourself or others";
	}

	if (!formProps.fullName) {
		errors.fullName = "Please enter the full name of participant";
	}

	if (!formProps.email) {
		errors.email = "Please enter an email";
	}

	if (
		formProps.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
	) {
		errors.email = "Invalid email address";
	}

	if (!formProps.identityNumber) {
		errors.identityNumber = "Please enter the identity number of participant";
	}

	if (formProps.gender !== true && formProps.gender !== false) {
		errors.gender = "Please select the gender of the participant";
	}

	if (!formProps.nationality) {
		errors.nationality = "Please select nationality of participant";
	}

	if (!formProps.dateOfBirth) {
		errors.dateOfBirth = "Please select date of birth of participant";
	}
	
	if (!formProps.apparelSize) {
		errors.apparelSize = "Please choose an apparel size";
	}

	if (!formProps.countryOfResidence) {
		errors.countryOfResidence =
			"Please select country of residence of participant";
	}

	if (!formProps.phone) {
		errors.phone = "Please enter the phone number of participant";
	}

	if (!formProps.postcode) {
		errors.postcode = "Please enter the postcode";
	}


	if (!formProps.emergencyContactName) {
		errors.emergencyContactName =
			"Please enter the name of the emergency contact";
	}

	if (!formProps.emergencyContactPhone) {
		errors.emergencyContactPhone =
			"Please enter the phone number of the emergency contact";
	}

	if (!formProps.relationship) {
		errors.relationship =
			"Please enter the relationship of the emergency contact and the participant";
	}

	if (formProps.withMedicalCondition !== true && formProps.withMedicalCondition !== false) {
		errors.withMedicalCondition = "Please select one";
	}

	if (
		formProps.withMedicalCondition === true &&
		!formProps.medicalConditionDescription
	) {
		errors.medicalConditionDescription =
			"Please enter the description of medical condition";
	}
	
	if (wantsPostalService !== true && wantsPostalService !== false) {
		errors.wantsPostalService = "Please choose one";
	}
	
	if (wantsPostalService === true) {
		if (!formProps.line1) {
			errors.line1 = "Please enter the postal address";
		}
		if (!formProps.postalCity) {
			errors.postalCity = "Please enter the postal city";
		}
		if (!formProps.postalPostcode) {
			errors.postalPostcode = "Please enter the postcode";
		}
		if (!formProps.postalState) {
			errors.postalState = "Please choose a state. Choose others if not in Malaysia";
		}
		if (!formProps.postalCountry) {
			errors.postalCountry = "Please choose a country";
		}
	}

	return errors;
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		initialValues: state.participant
	};
}

function renderErrorText(touched, error) {
  if (touched) {
    return (error);
  }
}

export default connect(mapStateToProps, { ...participant_actions, fetchEvent, updateStepper })(
	reduxForm({
		validate,
		form: "participant"
	})(ParticipantForm)
);
