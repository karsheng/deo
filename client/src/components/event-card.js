import React, { Component } from 'react';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { formatDate } from '../helper/';
import { withRouter } from 'react-router-dom';

const style = {
	cardContainer:  {
		marginBottom: '24px'	
	},
	cardActions: {
		textAlign: 'center'
	},
	viewEventButton: {
		boxShadow: 'none',
		borderRadius: '0px',
		height: '48px'
	}
};

class EventCard extends Component {
	render() {
		const { event } = this.props;
		return(
			<div className="col-xs-12 col-sm-4">
				<Card
					containerStyle={style.cardContainer}
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
						style={style.cardActions}
					>
						 <FlatButton
						 	style={style.viewEventButton}
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
}


export default withRouter(EventCard);