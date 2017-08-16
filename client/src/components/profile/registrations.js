import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/profile_actions';
import { Link } from 'react-router-dom';
import Progress from '../progress';
import Avatar from 'material-ui/Avatar';

const style = {
	div: {
		maxWidth: 768,
		margin: '0 auto'
	},
	paper: {
		height: '100%',
		width: '100%',
	}
};

class Registrations extends Component {
	componentWillMount() {
		this.props.fetchUserInfo();
	}
	
	renderUpcomingEvents(registrations) {
		return registrations.map(reg => {
			if (reg.event.open) {
				return(
		      		<ListItem 
		      			primaryText={reg.participant.fullName}
		      			secondaryText={reg.event.name}
		      			containerElement={<Link to={"/event/" + reg.event._id} />}
		      			leftAvatar={<Avatar src={reg.event.imageUrl} />}
		      			key={reg._id}
		      		/>
				);
			}
		});
	}
	
	renderClosedEvents(registrations) {
		return registrations.map(reg => {
			if (!reg.event.open) {
				return(
		      		<ListItem 
		      			primaryText={reg.participant.fullName}
		      			secondaryText={reg.event.name}
		      			containerElement={<Link to={"/event/" + reg.event._id} />}
		      			leftAvatar={<Avatar src={reg.event.imageUrl} />}
		      			key={reg._id}
		      		/>
				);
			}
		});
	}
	
    render() {
    	const { registrations } = this.props;
    	
        return(
        	<div className="row" style={style.div}>
            <div className="col-xs-12">
    			<h2>Events Joined</h2>
        		<Tabs>
        			<Tab label="Upcoming">
        				<Paper style={style.paper}>
							<List>
								{registrations ? this.renderUpcomingEvents(registrations) : <Progress />}
							</List>
    					</Paper>
        			</Tab>
        			<Tab label="Closed">
        				<Paper style={style.paper}>
    	    				<List>
								{registrations ? this.renderClosedEvents(registrations) : <Progress />}
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