import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import MealCard from './meal_card';
import _ from 'lodash';
import { resetMealSelection } from '../../actions/registration_actions';
import Stepper from './stepper';
import { updateStepper } from '../../actions/stepper_actions';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "768px",
		margin: "auto",
		padding: "20px"		
	},
	nextBtn: {
		float: 'right'
	}
};

class MealSelection extends Component {

	componentWillMount() {
		const { selectedCategory, selectedMeals } = this.props;
		const { event_id } = this.props.match.params;

		if (!selectedCategory) return this.props.history.push(`/event/${event_id}`);
		if (selectedCategory.event !== event_id) return this.props.history.push(`/event/${event_id}`);
		// if selectedMeals' event is not equal to event_id
		// set selectedMeals to {} with resetMealSelection action
		if (!_.findKey(selectedMeals, { event: event_id })) this.props.resetMealSelection();
		this.props.updateStepper(2);
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	renderMealForm(event) {
		return event.meals.map((meal) => {
			return(
				<MealCard
					key={meal._id} 
					meal={meal}
					event={event}
				/>
			);
		});
	}

	render()	{
		const { event } = this.props;
		if (!event) {
			return(
				<CircularProgress />
			);
		}

		return(
			<div>
				<Stepper />
				<Paper zDepth={3} style={style.paper} >
					<h2>{event.name}</h2>
					<h3>Step 3: Order Meal</h3>
					<div className="row">
						{this.renderMealForm(event)}
					</div>
					<div>
					<br /><br /><br /><br />
					<Divider />
					<br />					
						<RaisedButton 
							label="Back"
							secondary={true}
							onTouchTap={() => this.props.history.push(`/registration/category/${event._id}`)}
						/>
						<RaisedButton 
							label="Next"
							primary={true}
							style={style.nextBtn}
							onTouchTap={() => this.props.history.push(`/registration/checkout/${event._id}`)}
						/>
					</div>
				</Paper>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		selectedCategory: state.registration.selectedCategory,
		selectedMeals: state.registration.selectedMeals
	};
}

export default connect(mapStateToProps, { resetMealSelection, updateStepper })(MealSelection);