import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/event_actions";
import { openSigninDialog } from '../../actions/auth_actions';
import _ from "lodash";
import { Link } from "react-router-dom";
import CircularProgress from "material-ui/CircularProgress";
import ReactSVG from "react-svg";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { formatDate, getTime } from "../../helper/";
import EventMap from "./event_map";
import EventCategoryTable from "./event_category_table";

const style = {
	card: {
		maxWidth: "768px",
		margin: "0 auto"
	},
	cardImg: {
		maxHeight: "380px",
		height: "auto"
	},
	registerButton: {
		marginLeft: "8px"
	}
};

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registered: false
		};
	}

	renderEventDetails(event) {
		const time = getTime(event.datetime);
		const earlyBirdDetails = () => {
			if (event.earlyBirdEndDate) {
				return(
					<p>
						Early Bird Expiry Date: {formatDate(event.earlyBirdEndDate)} 
					</p>
				)
			}
			return null;
		}

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
			</div>
		);
	}

	renderCollectionInfo(event) {
		if (event.collectionInfo) {
			// TODO: make this map array
			const collection = event.collectionInfo[0];
			return (
				<div>
					<h3>Collection Info</h3>
					<p>
						Location: <Link to={`https://www.google.com/maps?q=${collection.lat},${collection.lng}`} target="_blank">{collection.address}</Link>
					</p>
					<p>
						Date & Time: {collection.time}
					</p>
					<p>
						Description: {collection.description}
					</p>
				</div>
			);
		}
	}

	handleRegisterButtonclick() {
		if (this.props.authenticated) {
			this.props.history.push("/registration/participant/" +  this.props.match.params._id);
		} else {
			this.props.openSigninDialog();
		}
	}

	renderRegisterButton(event) {
		if (this.state.registered) {
			return (
				<RaisedButton
					style={style.registerButton}
					disabled={true}
					label="Registered"
				/>
			);
		}

		return (
			<RaisedButton
				style={style.registerButton}
				primary={true}
				onTouchTap={this.handleRegisterButtonclick.bind(this)}
				label="Register"
			/>
		);
	}
	renderAirbnbButton(address) {
		return (
			<IconButton
				style={{ padding: 0 }}
				iconStyle={{ width: 36, height: 36 }}
				href={"https://airbnb.com/s/" + address}
				target="_blank"
			>
				<ReactSVG path="/src/svg/airbnb.svg" />
			</IconButton>
		);
	}
	renderBookingButton(address) {
		return (
			<IconButton
				style={{ padding: 0 }}
				iconStyle={{ width: 60, height: 36 }}
				href={"https://www.booking.com/search.html?ss=" + address}
				target="_blank"
			>
				<ReactSVG path="/src/svg/booking.svg" />
			</IconButton>
		);
	}

	componentDidMount() {
		const { user } = this.props;
		const { _id } = this.props.match.params;

		if (user) {
			const registeredEvents = _.map(_.map(user.registrations, "event"), "_id");
			if (registeredEvents.indexOf(_id) > -1)
				this.setState({ registered: true });
		}
	}

	componentWillMount() {
		const { _id } = this.props.match.params;
		this.props.fetchEvent(_id, _ => {});
	}

	render() {
		const { event } = this.props;
		if (!event) {
			return <CircularProgress />;
		}

		return (
			<Card style={style.card}>
				<CardMedia>
					<img style={style.cardImg} src={event.imageUrl} alt="" />
				</CardMedia>
				<CardTitle title={event.name} />
				<CardText>
					{this.renderEventDetails(event)}
					<br />
					{this.renderCollectionInfo(event)}
					<br />
					<h3>Categories</h3>
					<EventCategoryTable event={event} />
					<br />
				</CardText>
				<CardActions>
					{this.renderRegisterButton(event)}
					{this.renderAirbnbButton(event.address)}
					{this.renderBookingButton(event.address)}
				</CardActions>
				<CardMedia>
					<EventMap lat={event.lat} lng={event.lng} />
				</CardMedia>
			</Card>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params._id],
		user: state.auth.info,
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, { ...actions, openSigninDialog })(EventPage);
