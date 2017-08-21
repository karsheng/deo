import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/profile_actions';
import { Link } from 'react-router-dom';
import Progress from '../progress';
import Avatar from 'material-ui/Avatar';
import { formatDate } from '../../helper/';
import Divider from 'material-ui/Divider';

const style = {
	div: {
		maxWidth: 768,
		margin: '0 auto'
	},
	paper: {
		height: '100%',
		width: '100%'
	}
};

class Registrations extends Component {
	componentWillMount() {
		this.props.fetchUserInfo();
	}

	renderUpcomingEvents(registrations) {
		return registrations.map(reg => {
			if (reg.event.open) {
				return (
					<div key={reg._id}>
						<Divider inset={false} />
						<ListItem
							primaryText={reg.participant.fullName}
							secondaryText={
								<span>
									{reg.event.name}
									<br />
									{formatDate(reg.event.datetime)}
								</span>
							}
							secondaryTextLines={2}
							containerElement={<Link to={'/event/' + reg.event._id} />}
							leftAvatar={<Avatar src={reg.event.imageUrl} />}
						/>
					</div>
				);
			}
		});
	}

	renderClosedEvents(registrations) {
		return registrations.map(reg => {
			if (!reg.event.open) {
				return (
					<div key={reg._id}>
						<Divider inset={false} />
						<ListItem
							primaryText={reg.participant.fullName}
							secondaryText={
								<span>
									{reg.event.name}
									<br />
									{formatDate(reg.event.datetime)}
								</span>
							}
							secondaryTextLines={2}
							containerElement={<Link to={'/event/' + reg.event._id} />}
							leftAvatar={<Avatar src={reg.event.imageUrl} />}
						/>
					</div>
				);
			}
		});
	}

	render() {
		const { registrations } = this.props;

		return (
			<div className="row" style={style.div}>
				<div className="col-xs-12">
					<h2>Events Joined</h2>
					<Tabs>
						<Tab label="Upcoming">
							<Paper style={style.paper}>
								<List>
									{registrations
										? this.renderUpcomingEvents(registrations)
										: <Progress />}
								</List>
							</Paper>
						</Tab>
						<Tab label="Closed">
							<Paper style={style.paper}>
								<List>
									{registrations
										? this.renderClosedEvents(registrations)
										: <Progress />}
								</List>
							</Paper>
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		registrations: state.profile.registrations
	};
}

export default connect(mapStateToProps, { fetchUserInfo })(Registrations);
