import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/event_actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import Slider from 'react-slick';
import Divider from 'material-ui/Divider';
import { formatDate } from '../helper/';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const containerStyle = {
	marginBottom: '24px'
};

const cardActionsStyle = {
	textAlign: 'center'
};

const viewEventBtnStyle = {
	boxShadow: 'none',
	borderRadius: '0px',
	height: '48px'
};

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
	renderEvents() {
		const events =  _.map(this.props.events, (event) => {
			if (event.open) {

				return(
					<div key={event._id} className="col-xs-12 col-sm-4">
						<Card
							containerStyle={containerStyle}
						>
							<CardHeader
								title={event.name}
								subtitle={event.address + ' | ' + formatDate(event.datetime)}
							>
							</CardHeader>
							<CardMedia>
								<img src={event.imageUrl} alt={event.name} />
							</CardMedia>
							<CardActions
								style={cardActionsStyle}
							>
								 <FlatButton
								 	style={viewEventBtnStyle}
								 	fullWidth={true}
								 	secondary={true}
								 	onTouchTap={() => this.props.history.push(`/event/${event._id}`)}
								 	label="View Event"
								 >
								 </FlatButton>
							</CardActions>
						</Card>
					</div>
				);
			}
		});

		return _.without(events, undefined);
	}
	render() {
		return(
			<div>
				<Slider {...settings}>
	        <div className="main-slider"><img src="http://www.buttonbox.ie/images/media/800/166.jpg" alt=""/></div>
	        <div className="main-slider"><img src="http://www.tetonparksandrec.org/images/uploads/bucket/Hillclimb_square_logo_white.jpg" alt=""/></div>
	        <div className="main-slider"><img src="https://www.runsociety.com/wp-content/themes/runsociety-4/images/default-event.jpg?x93482" alt=""/></div>
	        <div className="main-slider"><img src="https://event.howei.com/sites/default/files/events/2016/SPHalf2016/sp-half-banner.jpg" alt=""/></div>
	      </Slider>	
				<br/>
				<br/>
				<h2>Events</h2>
				<div className="row">
					{this.renderEvents()}
				</div>
				<br/>
				<RaisedButton
					label="View More"
					fullWidth={true}
					secondary={true}
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