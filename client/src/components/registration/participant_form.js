import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton } from "material-ui/RadioButton";
import { connect } from "react-redux";
import * as participant_actions from "../../actions/participant_actions";
import { updateStepper } from '../../actions/stepper_actions';
import { fetchEvent } from "../../actions/event_actions";
import { COUNTRIES } from "../../constants";
import CircularProgress from "material-ui/CircularProgress";
import Stepper from './stepper';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {
	renderMenuItem,
	renderRadioGroup,
	renderSelectField,
	renderDatePicker,
	renderField
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
	componentWillMount() {
		const { event_id } = this.props.match.params;
		this.props.fetchEvent(event_id, () => {
			this.props.updateStepper(0);
		});
	}

	handleFormSubmit(formProps) {
		const participant = { ...formProps };
		const { event_id } = this.props.match.params;
		participant.emergencyContact = {
			name: formProps.emergencyContactName,
			relationship: formProps.relationship,
			phone: formProps.emergencyContactPhone
		};

		if (formProps.male) {
			participant.gender = formProps.male === "male" ? true : false;
		}

		if (participant.withMedicalCondition) {
			participant.medicalCondition = {
				yes: formProps.withMedicalCondition === "yes" ? true : false,
				description: formProps.medicalConditionDescription
			};
		}
		if (formProps.self) {
			participant.registerForSelf = formProps.self === "yes" ? true : false;
		}

		this.props.updateParticipantInfo(participant);
		this.props.history.push(`/registration/category/${event_id}`);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { event, handleSubmit, reset, submitting } = this.props;
		// TODO: change apparel size to dropdown list
		// TODO: change medical condition description to textarea
		if (!event) {	
			return <CircularProgress />;
		}

		return (
			<div>
				<Stepper />
				<Paper style={style.paper} zDepth={3} >
					<form style={style.form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<h2>{event.name}</h2>
						<h3>Step 1: Participant Info</h3>
						<div className="row">
						<div className="col-xs-12 col-md-6">
						<p>Are you registering for yourself?</p>
						<Field name="self" component={renderRadioGroup}>
							<RadioButton value="yes" label="yes" />
							<RadioButton value="others" label="others" />
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
						<Field name="male" component={renderRadioGroup}>
							<RadioButton value="male" label="male" />
							<RadioButton value="female" label="female" />
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
							component={renderField}
						/>
						<br />
						<p>Date of birth:</p>
						<Field
							label="Date of Birth"
							hintText="Date of Birth"
							name="dateOfBirth"
							component={renderDatePicker}
						/>
						<br />
						</div>
						<div className="col-xs-12 col-md-6">
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
						<h3>Medical Condition</h3>
						<Field name="withMedicalCondition" component={renderRadioGroup}>
							<RadioButton value="yes" label="yes" />
							<RadioButton value="no" label="no" />
						</Field>
						<br />
						<Field
							label="Description"
							type="text"
							name="medicalConditionDescription"
							component={renderField}
						/>
						<br />
						</div>
						</div>
						{this.renderAlert()}
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

	if (!formProps.self) {
		errors.self = "Please tell us if you're registering for yourself or others";
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

	if (!formProps.male) {
		errors.male = "Please select the gender of the participant";
	}

	if (!formProps.nationality) {
		errors.nationality = "Please select nationality of participant";
	}

	if (!formProps.dateOfBirth) {
		errors.dateOfBirth = "Please select date of birth of participant";
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

	if (!formProps.withMedicalCondition) {
		errors.withMedicalCondition = "Please select one";
	}

	if (
		formProps.withMedicalCondition === "yes" &&
		!formProps.medicalConditionDescription
	) {
		errors.medicalConditionDescription =
			"Please enter the description of medical condition";
	}

	return errors;
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		initialValues: state.participant
	};
}

export default connect(mapStateToProps, { ...participant_actions, fetchEvent, updateStepper })(
	reduxForm({
		validate,
		form: "participant"
	})(ParticipantForm)
);
