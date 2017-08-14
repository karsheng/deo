import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/auth_actions';
import { openSnackbar } from '../../actions/snackbar_actions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { renderField } from '../../helper/';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "500px",
		margin: "30px auto",
		padding: "20px"
	}
};

class Signin extends Component {

	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password }, () => {
			this.props.openSnackbar(`Signed in as ${email}`);
    		this.props.history.push('/');
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

	render() {
		const { handleSubmit, pristine, reset, submitting} = this.props;
		return(
			<Paper zDepth={3} style={style.paper}>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<h2>Sign In</h2>
					<Field
						label="Email"
						name="email"
						type="text"
						component={renderField}
					/>
					<br/>
					<Field
						label="Password"
						name="password"
						type="password"
						component={renderField}
					/>
					<br/>
					{this.renderAlert()}
					<br/>
					<br/>
					<RaisedButton primary={true} type="submit" label="Login" className="button-submit" disabled={pristine || submitting} ></RaisedButton>
					<br /><br />
					<h5>Not a member? <Link to="/signup">Sign up here!</Link></h5>
        			<br /><br />
				</form>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.signinError };
}

export default reduxForm({
	form: 'signin'
})(
	connect(mapStateToProps, { ...actions, openSnackbar })(Signin)
);



