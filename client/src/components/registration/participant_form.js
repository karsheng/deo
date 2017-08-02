import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton } from "material-ui/RadioButton";
import { connect } from "react-redux";
import * as actions from "../../actions/participant_actions";
import { COUNTRIES } from "../../constants";
import {
	renderMenuItem,
	renderRadioGroup,
	renderSelectField,
	renderDatePicker,
	renderField
} from "../../helper/";

const style = {
	backBtn: {
		marginRight: '24px'
	}
}

class ParticipantForm extends Component {
	handleFormSubmit(formProps) {
		const participant = { ...formProps };
		const { event_id } = this.props.match.params;
		participant.emergencyContact = {
			name: formProps.emergencyContactName,
			relationship: formProps.relationship,
			phone: formProps.emergencyContactPhone
		};

		participant.gender = formProps.gender === "male" ? true : false;
		participant.medicalCondition = {
			yes: formProps.medicalCondition === "yes" ? true : false,
			description: formProps.medicalConditionDescription
		};

		participant.registerForSelf =
			formProps.registerForSelf === "yes" ? true : false;

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
		const { handleSubmit, pristine, reset, submitting } = this.props;
		// TODO: change apparel size to dropdown list
		// TODO: change medical condition description to textarea
		// TODO: fixed autocomplete issue
		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<h3>Step 1: Participant Info</h3>
					<p>Are you registering for yourself?</p>
					<Field name="registerForSelf" component={renderRadioGroup}>
						<RadioButton value="yes" label="yes" />
						<RadioButton value="others" label="others" />
					</Field>
					<br />
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
					<Field name="gender" component={renderRadioGroup}>
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
					<h3>Medical Condition</h3>
					<Field name="medicalCondition" component={renderRadioGroup}>
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
					{this.renderAlert()}
					<br />
					<RaisedButton
						type="submit"
						label="Back"
						secondary={true}
						style={style.backBtn}
						onTouchTap={() => this.props.history.push(`/event/${this.props.match.params.event_id}`)}
					/>
					<RaisedButton
						type="submit"
						label="Next"
						disabled={pristine || submitting}
						primary={true}
					/>
				</form>
			</div>
		);
	}
}

function validate(formProps) {
	const errors = {};

	if (!formProps.registerForSelf) {
		errors.registerForSelf =
			"Please tell us if you're registering for yourself or others";
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

	if (!formProps.gender) {
		errors.gender = "Please select the gender of the participant";
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

	if (!formProps.medicalCondition) {
		errors.medicalCondition = "Please select one";
	}

	if (
		formProps.medicalCondition === "yes" &&
		!formProps.medicalConditionDescription
	) {
		errors.medicalConditionDescription =
			"Please enter the description of medical condition";
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		initialValues: state.participant
	};
}

export default connect(mapStateToProps, actions)(
	reduxForm({
		validate,
		form: "participant"
	})(ParticipantForm)
);
