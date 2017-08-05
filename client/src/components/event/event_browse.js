import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecificEvents } from '../../actions/event_actions';
import EventCard from './event_card';
import EventFilter from './event_filter';

class EventBrowse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'any',
			distance: 0,
			month: 9999,
			stateName: 'any'
		};
		this.setFilter = this.setFilter.bind(this);
	}

	isWithinFilteredRange(element, index, array) {
		let min, max;
		
		switch(this.state.distance) {
			case 0:
				min = 0;
				max = 9999;
				break;
			case 5:
				min = 0;
				max = 5;
				break;
			case 10:
				min = 5;
				max = 10;
				break;
			case 21:
				min = 10;
				max = 21;
				break;
			case 42: 
				min = 21;
				max = 42;
				break;
			case 9999:
				min = 42;
				max = 9999;
				break;
			default:
				min = 0;
				max = 9999;
		}
		return element >= min && element <= max;
	}

	isInSelectedMonth(date) {
		const datetime = new Date(date);
		if (this.state.month === 9999) {
			return true;
		} else {
			return datetime.getMonth() === this.state.month;
		}
	}

	isInSelectedState(stateName) {
		if (this.state.stateName === 'any') {
			return true
		} else {
			return stateName === this.state.stateName;
		}
	}

	setFilter(e, state) {
    e.preventDefault();
		this.setState(state);
	}

	componentWillMount() {
		this.props.fetchSpecificEvents(this.state.type, () => {

		});
	}

	renderEvents() {
		const filteredEvents =  _.map(this.props.filteredEvents, (event_id) => {
			return this.props.events[event_id];
		});

		return filteredEvents.map(event => {
			const distances = _getDistance(event.categories);
			const distanceIsWithinRange = distances.some(this.isWithinFilteredRange.bind(this));
			const eventIsInSelectedMonth = this.isInSelectedMonth.bind(this)(event.datetime);
			const eventisInSelectedState = this.isInSelectedState.bind(this)(event.stateName);
			if (distanceIsWithinRange && eventIsInSelectedMonth && eventisInSelectedState) {
				return(
					<EventCard
						key={event._id}
						event={event}
					/>
				);
			}
		});
	}

	render() {
		const { events } = this.props;
		if (!events) return <div>Loading...</div>; 
		return(
			<div>
				<div className="col-xs-12">
					<h2>Browse Events</h2>
				</div>
				<EventFilter 
					state={this.state}
					setFilter={this.setFilter}
				/>
				{this.renderEvents()}
			</div>
		);
	}
}

function _getDistance(categories) {
	return categories.map(category => {
		return category.distance
	});
}


function mapStateToProps(state) {
	return {
		events: state.events,
		filteredEvents: state.events.filteredEvents
	};
}

export default connect(mapStateToProps, { fetchSpecificEvents })(EventBrowse);