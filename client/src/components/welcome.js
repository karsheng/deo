import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/event_actions';
import _ from 'lodash';
import Slider from 'react-slick';
import RaisedButton from 'material-ui/RaisedButton';
import EventCard from './event/event_card';
import Progress from './progress';

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false
};

class WelcomePage extends Component {
	componentWillMount() {
		this.props.fetchEvents();
	}

	renderEvents(events) {
		return _.map(events, event => {
			return (
				<div key={event._id}>
					<EventCard key={event._id} event={event} />
				</div>
			);
		});
	}
	render() {
		const { events } = this.props;
		return (
			<div>
				<Slider {...settings}>
					<div className="main-slider">
						<img
							src="http://www.buttonbox.ie/images/media/800/166.jpg"
							alt=""
						/>
					</div>
					<div className="main-slider">
						<img
							src="http://www.tetonparksandrec.org/images/uploads/bucket/Hillclimb_square_logo_white.jpg"
							alt=""
						/>
					</div>
					<div className="main-slider">
						<img
							src="https://www.runsociety.com/wp-content/themes/runsociety-4/images/default-event.jpg?x93482"
							alt=""
						/>
					</div>
					<div className="main-slider">
						<img
							src="https://event.howei.com/sites/default/files/events/2016/SPHalf2016/sp-half-banner.jpg"
							alt=""
						/>
					</div>
				</Slider>
				<br />
				<br />
				<h2 className="col-xs-12">Events</h2>
				{events ? this.renderEvents(events) : <Progress />}
				<br />
				<RaisedButton
					label="View More"
					fullWidth={true}
					secondary={true}
					onTouchTap={() => this.props.history.push('/event/browse')}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		events: state.events
	};
}

export default connect(mapStateToProps, actions)(WelcomePage);
