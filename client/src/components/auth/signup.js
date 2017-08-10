import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/auth_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { COUNTRIES, INTERESTS } from '../../constants';
import { renderField } from '../../helper/';
import Paper from 'material-ui/Paper';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "500px",
		margin: "30px auto",
		padding: "20px"
	}
};


class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps, () => {
      this.props.history.goBack();
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
  
  render() {
    const { handleSubmit, pristine, reset, submitting} = this.props;
    // javascript triocl
    // if (x && y && z) === true return z
    return (
      <Paper zDepth={3} style={style.paper}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2>Sign Up</h2>
          <Field 
            label="Name:"
            type="text"
            name="name"
            component={renderField}
          />
          <br/>
          <Field 
            label="Email:"
            type="text"
            name="email"
            component={renderField}
          />
          <br/>
          <Field 
            label="Password:"
            type="password"
            name="password"
            component={renderField}
          />
          <br/>
          <Field 
            label="Confirm Password:"
            type="password"
            name="passwordConfirm"
            component={renderField}
          />
          <br/>
          {this.renderAlert()}
          <br/>
          <br/>
          <RaisedButton type="submit" label="Sign Up" disabled={pristine || submitting} primary={true} />
          <br /><br />
          <h5>Existing member? <Link to="/signin">Sign in here!</Link></h5>
          <br /><br />
        </form>
      </Paper>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

	if (
		formProps.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
	) {
		errors.email = "Invalid email address";
	}

  // TODO: validate passwords
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.signupError };
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
);

