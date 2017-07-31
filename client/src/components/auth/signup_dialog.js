import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions/auth_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { renderField } from "../../helper/";
import RaisedButton from "material-ui/RaisedButton";

class SignupDialog extends Component {
	handleFormSubmit(formProps) {
		this.props.signupUser(formProps, () => {
			this.props.history.push("/");
			this.props.closeSignupDialog();
		});
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

	handleFormSwitch() {
    this.props.closeSignupDialog();
    this.props.openSigninDialog();
  }

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<div>
				<Dialog
					title="Sign Up"
					modal={false}
					open={this.props.signupDialogOpen}
					onRequestClose={this.props.closeSignupDialog}
				>
					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<Field
							label="Name:"
							type="text"
							name="name"
							component={renderField}
						/>
						<br />
						<Field
							label="Email:"
							type="text"
							name="email"
							component={renderField}
						/>
						<br />
						<Field
							label="Password:"
							type="password"
							name="password"
							component={renderField}
						/>
						<br />
						<Field
							label="Confirm Password:"
							type="password"
							name="passwordConfirm"
							component={renderField}
						/>
						<br />
            {this.renderAlert()}
						<br />
						<br />
						<RaisedButton
							type="submit"
							label="Sign Up"
							className="button-submit"
							disabled={pristine || submitting}
							primary={true}
						/>
					</form>
					<br />
          <h5>Existing member? <a onClick={this.handleFormSwitch.bind(this)}>Sign in here!</a></h5>
          <br />
          <br />
				</Dialog>
			</div>
		);
	}
}

function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = "Please enter an email";
	}

	if (!formProps.password) {
		errors.password = "Please enter a password";
	}

	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = "Please enter a password confirmation";
	}

	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = "Passwords must match";
	}

	// TODO: more validation

	return errors;
}

function mapStateToProps(state) {
	return {
    signupDialogOpen: state.auth.signupDialogOpen,
		errorMessage: state.auth.error
	};
}
export default reduxForm({ validate, form: "signup" })(
	connect(mapStateToProps, actions)(withRouter(SignupDialog))
);
