import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRegistrationInfo } from '../../actions/registration_actions';
import { openSnackbar } from '../../actions/snackbar_actions';
import Paper from 'material-ui/Paper';

const style = {
	paper: {
		height: '100%',
		width: '100%',
		maxWidth: '768px',
		margin: 'auto',
		padding: '20px',
		marginTop: '30px'
	},
	h4: {
		textAlign: 'center'
	}
};

class ConfirmationPage extends Component {
	componentWillMount() {
		const { registration_id } = this.props.match.params;
		this.props.fetchRegistrationInfo(registration_id, registration => {
			// TODO: if no registration found, show default error page
			// if registration is not paid, redirect to payment
			if (!registration.paid) {
				this.props.history.push(`/registration/payment/${registration_id}`);
			}
		});
	}

	componentDidMount() {
		this.props.openSnackbar('Event registered successfully!');
	}

	render() {
		const { event, totalBill, participant } = this.props.info;
		return (
			<Paper zDepth={3} style={style.paper}>
				<h2>Confirmation</h2>
				<h3>
					{event.name}
				</h3>
				<p>
					Total: RM {totalBill.toFixed(2)}
				</p>
				<br />
				<br />
				<h4 style={style.h4}>
					Thank you for registering with us! A confirmation email will be sent
					to {participant.email}.
				</h4>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return {
		info: state.registration.info
	};
}

export default connect(mapStateToProps, {
	fetchRegistrationInfo,
	openSnackbar
})(ConfirmationPage);
