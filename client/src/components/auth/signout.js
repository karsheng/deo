import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/auth_actions';
import { openSnackbar } from '../../actions/snackbar_actions';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "500px",
		margin: "30px auto",
		padding: "20px",
		textAlign: "center"
	}
};


class Signout extends Component {
	componentWillMount() {
		this.props.signoutUser();
		this.props.openSnackbar('Successfully signed out.')
	}
	render() {
		return(
			<Paper zDepth={3} style={style.paper}>
				<h3>You have been signed out successfully!</h3>
				<br /><br /><br /><br />
				<Link to="/">Go back to home page</Link>
				<br /><br />
			</Paper>
		);
	}
}

export default connect(null, { signoutUser, openSnackbar })(Signout);