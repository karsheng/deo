import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/event_actions';
import { openAuthDialog } from '../../actions/auth_actions';
import { Link } from 'react-router-dom';
import Progress from '../progress';
import {
	Card,
	CardActions,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { formatDate, getTime } from '../../helper/';
import EventMap from './event_map';
import EventCategoryTable from './event_category_table';
import AuthDialog from '../auth/auth_dialog';
import RegistrationCheckDialog from '../registration/registration_check_dialog';
import EventAccommodationDialog from './event_accommodation_dialog';
import EventDirectionDialog from './event_direction_dialog';

const style = {
	card: {
		maxWidth: '768px',
		margin: '0 auto'
	},
	cardImg: {
		maxHeight: '380px',
		height: 'auto'
	},
	registerButton: {
		marginLeft: '8px'
	},
	directionBtn: {
		marginRight: '8px'
	}
};

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regCheckDialogOpen: false,
			accoDialogOpen: false,
			directionDialogOpen: false
		};
	}

	openRegCheckDialog() {
		this.setState({ regCheckDialogOpen: true });
	}

	closeRegCheckDialog() {
		this.setState({ regCheckDialogOpen: false });
	}

	openAccoDialog() {
		this.setState({ accoDialogOpen: true });
	}

	closeAccoDialog() {
		this.setState({ accoDialogOpen: false });
	}

	openDirectionDialog() {
		this.setState({ directionDialogOpen: true });
	}

	closeDirectionDialog() {
		this.setState({ directionDialogOpen: false });
	}

	renderOrganizerDetails(organizers) {
		return organizers.map(organizer => {
			return (
				<div key={organizer._id}>
					<h3> Organizer Details</h3>
					{organizer.name
						? <p>
								Organizer: {organizer.name}
							</p>
						: ''}
					{organizer.email
						? <p>
								Email: {organizer.email}
							</p>
						: ''}
					{organizer.website
						? <p>
								Website: {organizer.email}
							</p>
						: ''}
				</div>
			);
		});
	}

	renderEventDetails(event) {
		const time = getTime(event.datetime);
		const earlyBirdDetails = () => {
			if (event.earlyBirdEndDate) {
				return (
					<p>
						Early Bird Expiry Date: {formatDate(event.earlyBirdEndDate)}
					</p>
				);
			}
			return null;
		};

		return (
			<div>
				<h3>Event Info</h3>
				<p>
					Date & Time : {`${formatDate(event.datetime)} ${time}`}
				</p>
				<p>
					Venue: {event.address}
				</p>
				<p>
					Registration Deadline: {formatDate(event.registrationDeadline)}
				</p>
				{earlyBirdDetails()}
				<RaisedButton
					style={style.directionBtn}
					label="Direction"
					onTouchTap={this.openDirectionDialog.bind(this)}
				/>
				<RaisedButton
					label="Accommodation"
					onTouchTap={this.openAccoDialog.bind(this)}
				/>
			</div>
		);
	}

	renderCollectionInfo(event) {
		if (event.collectionInfo) {
			const collections = event.collectionInfo;
			return collections.map(collection => {
				return (
					<div key={collection._id}>
						<h3>Collection Info</h3>
						<p>
							Location:{' '}
							<Link
								to={`https://www.google.com/maps?q=${collection.lat},${collection.lng}`}
								target="_blank"
							>
								{collection.address}
							</Link>
						</p>
						<p>
							Date & Time: {collection.time}
						</p>
						<p>
							Description: {collection.description}
						</p>
					</div>
				);
			});
		}
	}

	renderDeliveryInfo(delivery) {
		if (delivery.hasDeliveryOption) {
			return (
				<div>
					<p>Delivery By Post: Yes</p>
				</div>
			);
		}
	}

	renderApparelInfo(apparel) {
		if (apparel.sizes) {
			return (
				<div>
					<h3>Apparel Info</h3>
					<p>Attachment to be added</p>
				</div>
			);
		}
	}

	handleRegisterButtonclick() {
		if (this.props.authenticated) {
			this.openRegCheckDialog();
		} else {
			this.props.openAuthDialog();
		}
	}

	renderRegisterButton(event) {
		return (
			<RaisedButton
				style={style.registerButton}
				primary={true}
				onTouchTap={this.handleRegisterButtonclick.bind(this)}
				label="Register"
			/>
		);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentWillMount() {
		const { _id } = this.props.match.params;
		this.props.fetchEvent(_id, _ => {});
	}

	render() {
		const { event } = this.props;
		if (!event) {
			return <Progress />;
		}
		// TODO: airbnb, booking.com, grab and uber
		return (
			<div>
				<Card style={style.card}>
					<CardMedia>
						<img style={style.cardImg} src={event.imageUrl} alt="" />
					</CardMedia>
					<CardTitle title={event.name} />
					<CardText>
						{this.renderEventDetails(event)}
						<br />
						{this.renderOrganizerDetails(event.organizer)}
						<br />
						{this.renderCollectionInfo(event)}
						{this.renderDeliveryInfo(event.delivery)}
						<br />
						{this.renderApparelInfo(event.apparel)}
						<br />
						<h3>Categories</h3>
						<EventCategoryTable event={event} />
						<br />
					</CardText>
					<CardActions>
						{this.renderRegisterButton(event)}
					</CardActions>
					<CardMedia>
						<EventMap lat={event.lat} lng={event.lng} />
					</CardMedia>
				</Card>
				<AuthDialog />
				<RegistrationCheckDialog
					regCheckDialogOpen={this.state.regCheckDialogOpen}
					closeRegCheckDialog={this.closeRegCheckDialog.bind(this)}
				/>
				<EventAccommodationDialog
					accoDialogOpen={this.state.accoDialogOpen}
					closeAccoDialog={this.closeAccoDialog.bind(this)}
					lat={event.lat}
					lng={event.lng}
					address={event.address}
				/>
				<EventDirectionDialog
					directionDialogOpen={this.state.directionDialogOpen}
					closeDirectionDialog={this.closeDirectionDialog.bind(this)}
					lat={event.lat}
					lng={event.lng}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params._id],
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, { ...actions, openAuthDialog })(
	EventPage
);
