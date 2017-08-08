import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import * as actions from "../../actions/auth_actions";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter, Link } from "react-router-dom";

const style = {
  contentStyle: {
    maxWidth: "380px"
  }
};

class SigninDialog extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <TextField
        hintText={field.label}
        floatingLabelText={field.label}
        type={field.type}
        errorText={touched && error}
        fullWidth={true}
        {...field.input}
      />
    );
  }

  handleFormSubmit({ email, password }) {
    // Need to do something to sign user in
    this.props.signinUser({ email, password }, () => {
      this.props.history.push("/");
      this.props.closeSigninDialog();
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSwitch() {
    this.props.closeSigninDialog();
    this.props.openSignupDialog();
  }

  render() {
    const {
      signinDialogOpen,
      closeSigninDialog,
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;

    return (
      <div>
        <Dialog
          title="Sign In"
          modal={false}
          open={this.props.signinDialogOpen}
          contentStyle={style.contentStyle}
          onRequestClose={this.props.closeSigninDialog}
          autoScrollBodyContent={true}
        >
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field
              label="Email"
              name="email"
              type="text"
              component={this.renderField}
            />
            <br />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />
            <br />
            {this.renderAlert()}
            <br />
            <br />
            <RaisedButton
              type="submit"
              label="Sign In"
              disabled={pristine || submitting}
            />
          </form>
          <br />
          <h5>
            Not a member? <a onClick={this.handleFormSwitch.bind(this)}>Sign up here!</a>
          </h5>
          <br />
          <br />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signinDialogOpen: state.auth.signinDialogOpen,
    errorMessage: state.auth.error
  };
}

export default reduxForm({ form: "signin" })(
  connect(mapStateToProps, actions)(withRouter(SigninDialog))
);
