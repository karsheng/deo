import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/event_actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import ReactSVG from 'react-svg';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
	Card, CardActions, 
	CardHeader, CardMedia, 
	CardTitle, CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import GoogleMap from '../google_map';
import { formatDate } from '../../helper/';
import {
  Table, TableBody,
  TableFooter, TableHeader,
  TableHeaderColumn, TableRow,
  TableRowColumn
} from 'material-ui/Table';

const style = {
	card: {
		maxWidth: '768px',
		margin: '0 auto'
	},
	cardImg: {
		maxHeight: '380px',
		height: 'auto'	
	},
	categoryColumn: {
		width: '75%'
	},
	registerButton: {
		marginLeft: '8px'
	}
}

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registered: false
		};
	}

	renderCollectionInfo(event) {
		if (event.collectionInfo) {
			const collection = event.collectionInfo[0];
			return(
				<div>
					<h3>Collection Info</h3>
					<p>Location: {collection.address} </p>
					<p>Time: {collection.time} </p>
					<p>Description: {collection.description} </p>
				</div>
			);
		}
	}

	renderCategoryTable(event) {
  	const categories = event.categories.map(category => {
  		return(
	    	<TableRow key={category._id}>
	        <TableRowColumn style={style.categoryColumn} >{category.name}</TableRowColumn>
	        <TableRowColumn>{category.price}</TableRowColumn>
	      </TableRow>
  		);	
  	});

  	const renderTable = () => {
  		return(
				<Table>
	        <TableHeader
	        	adjustForCheckbox={false}
	        	displaySelectAll={false}
	        >
	          <TableRow>
	            <TableHeaderColumn style={style.categoryColumn} >Category</TableHeaderColumn>
	            <TableHeaderColumn>Price (RM)</TableHeaderColumn>
	          </TableRow>
	        </TableHeader>
	        <TableBody
	        	displayRowCheckbox={false}
	        	showRowHover={true}
	        >
	        	{categories}
	        </TableBody>
	      </Table>
	  	);	
  	}
  	const table = renderTable();
		return table;	
	}

	renderRegisterButton(event) {
		
		if (this.state.registered) {
			return(
				<RaisedButton 
					style={style.registerButton}
					disabled={true}
					label="Registered"
				/>			
			);
		}	

		return(
			<RaisedButton
				style={style.registerButton}
				primary={true} 
				containerElement={<Link to={"/registration/category/" + event._id}></Link>}
				label='Register'
			>
			</RaisedButton>
		);

	}
	renderAirbnbButton(address) {
		return(
			<IconButton
				style={{padding: 0}}
				iconStyle={{width: 36, height: 36}}
				href={"https://airbnb.com/s/" + address}
				target="_blank"
			>
				<ReactSVG 
					path="/src/svg/airbnb.svg"
				/>
			</IconButton>
		)
	}
	renderBookingButton(address) {
		return(
			<IconButton
				style={{padding: 0}}
				iconStyle={{width: 60, height: 36}}
				href={"https://www.booking.com/search.html?ss=" + address}
				target="_blank"
			>
				<ReactSVG 
					path="/src/svg/booking.svg"
				/>
			</IconButton>
		)	
	}

	componentDidMount() {
		const { user } = this.props;
		const { _id } = this.props.match.params;

		if (user) {
			const registeredEvents = _.map(_.map(user.registrations, 'event'), '_id');
			if (registeredEvents.indexOf(_id) > -1) this.setState({ registered: true });
		}
	}

	componentWillMount() {
    const { _id } = this.props.match.params;
		this.props.fetchEvent(_id, _ => {});
	}

	render() {
		const { event } = this.props;
		if (!event) {
			return(
				<CircularProgress />
			);
		}

		return (
			<Card style={style.card}>
				<CardMedia>
					<img style={style.cardImg} src={event.imageUrl} alt=""/>
				</CardMedia>
				<CardTitle title={event.name} subtitle={event.address + '  |  ' + formatDate(event.datetime)} />
				<CardText>
					{event.description}
					<p>Registration deadline: Today</p>
					{this.renderCollectionInfo(event)}
					<h3>Categories</h3>
					{this.renderCategoryTable(event)}
				</CardText>
				<CardActions>
					{this.renderRegisterButton(event)}	
					{this.renderAirbnbButton(event.address)}	
					{this.renderBookingButton(event.address)}
				</CardActions>
				<CardMedia>
					<GoogleMap lat={event.lat} lng={event.lng} />
				</CardMedia>
			</Card>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params._id],
		user: state.auth.info
	};
}

export default connect(mapStateToProps, actions)(EventPage);