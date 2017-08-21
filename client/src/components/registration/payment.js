import React, { Component } from 'react';
import { fetchRegistrationInfo } from '../../actions/registration_actions';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Progress from '../progress';

// To be deleted after integration of payment system
import FakePaymentButton from './fake_payment_button';

const style = {
	paper: {
		height: '100%',
		width: '100%',
		maxWidth: '768px',
		margin: 'auto',
		padding: '20px',
		marginTop: '30px'
	}
};

class Payment extends Component {
	componentWillMount() {
		const { registration_id } = this.props.match.params;
		this.props.fetchRegistrationInfo(registration_id, _ => {});
	}

	render() {
		const { event, totalBill } = this.props.info;

		if (!event) {
			return (
				<div>
					<Progress />
				</div>
			);
		}
		return (
			<Paper zDepth={3} style={style.paper}>
				<h2>Payment</h2>
				<h3>
					{event.name}
				</h3>
				<h4>
					Total: RM {totalBill.toFixed(2)}
				</h4>
				<br />
				<br />
				<br />
				<br />
				<h6 style={{ textAlign: 'center' }}>
					This is to simulate payment by user. Payment system will be integrated
					as part of Milestone 2
				</h6>
				<FakePaymentButton
					regId={this.props.info._id}
					history={this.props.history}
				/>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return {
		info: state.registration.info
	};
}

export default connect(mapStateToProps, { fetchRegistrationInfo })(Payment);
