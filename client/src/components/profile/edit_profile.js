import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import { RadioButton } from "material-ui/RadioButton";
import {
	renderMenuItem,
	renderRadioGroup,
	renderSelectField,
	renderDatePicker,
	renderField,
	renderTextarea
} from "../../helper/";
import { COUNTRIES, STATESNAME } from "../../constants";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { updateUserInfo } from '../../actions/profile_actions';
import { openSnackbar } from '../../actions/snackbar_actions';

const style = {
  paper: {
		height: "100%",
		width: "100%",
		maxWidth: "768px",
		margin: "auto",
		padding: "20px"
	},
	saveBtn: {
		float: "right"
	}
};

class EditProfile extends Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }
    
    renderPostalAddressForm() {
			return(
				<div>
					<h3>Postal Address</h3>
					<div>
						<Field
							label="Line 1"
							type="text"
							name="line1"
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Line 2"
							type="text"
							name="line2"
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Line 3"
							type="text"
							name="line3"
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="City"
							type="text"
							name="postalCity"
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="Postcode"
							type="text"
							name="postalPostcode"
							component={renderField}
						/>
					</div>
					<div>
						<Field
							label="State"
							type="text"
							name="postalState"
							component={renderSelectField}
						>
							{renderMenuItem(STATESNAME)}
						</Field>
					</div>
					<div>
						<Field
							label="Country"
							name="postalCountry"
							component={renderSelectField}
						>
							{renderMenuItem(COUNTRIES)}
						</Field>
					</div>
				</div>
			);
    }
    
    handleFormSubmit(formProps) {
    	let profile = { ...formProps };
    	
			profile.postalAddress = {
				line1: formProps.line1,
				line2: formProps.line2,
				line3: formProps.line3,
				city: formProps.postalCity,
				postcode: formProps.postalPostcode,
				state: formProps.postalState,
				country: formProps.postalCountry
			};
			
			profile.emergencyContact = {
				name: formProps.emergencyContactName,
				relationship: formProps.relationship,
				phone: formProps.emergencyContactPhone
			};
			
			profile.medicalCondition = {
				yes: formProps.withMedicalCondition,
				description: formProps.medicalConditionDescription
			};
			
			this.props.updateUserInfo(profile, () => {
				this.props.history.push('/profile');
				this.props.openSnackbar('Profile successfully updated!');
			});
    }
    
    render() {
      const { handleSubmit, submitting } = this.props;
		
        return(
          <div>
            <Paper style={style.paper} zDepth={3}>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <h3>Edit Profile</h3>
                <div className="row">
    							<div className="col-xs-12 col-md-6">
    							<Field
    								label="Full Name (as per IC or passport)"
    								type="text"
    								name="fullName"
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
    								<br />
    								{this.renderPostalAddressForm()}
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
											this.props.history.push('/profile')}
									/>
    							<RaisedButton
    								type="submit"
    								label="Save"
    								style={style.saveBtn}
    								disabled={submitting}
    								primary={true}
    							/>
    						</div>
              </form>
            </Paper>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile
  };
}

export default connect(mapStateToProps, { updateUserInfo, openSnackbar })(
  reduxForm({
    form: "profile"
  })(EditProfile)
);