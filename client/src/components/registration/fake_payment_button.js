// to be deleted after integration of payment system
import React, { Component } from 'react';
import { ROOT_URL } from '../../constants';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

class FakePaymentButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false
		};
	}
	handleFakePayment() {
		this.setState({ submitting: true });

		const { regId } = this.props;
		const token = localStorage.getItem('deotoken');

		let config = {
			headers: { authorization: token }
		};

		axios
			.post(`${ROOT_URL}/api/fakepayment/${regId}`, null, config)
			.then(response => {
				this.props.history.push(`/registration/confirmation/${regId}`);
			})
			.catch(err => {
				console.log(err);
				this.setState({ submitting: false });
			});
	}

	render() {
		return (
			<div style={{ width: '100%', textAlign: 'center' }}>
				<RaisedButton
					style={{ float: 'center' }}
					label="Pay now"
					secondary={true}
					disabled={this.state.submitting}
					onTouchTap={this.handleFakePayment.bind(this)}
				/>
			</div>
		);
	}
}

export default FakePaymentButton;
