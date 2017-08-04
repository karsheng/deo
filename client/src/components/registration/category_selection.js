import React, { Component } from "react";
import { connect } from 'react-redux';
import CategoryCard from './category_card';
import CircularProgress from "material-ui/CircularProgress";
import { fetchEvent } from "../../actions/event_actions";
import _ from 'lodash';
import { selectCategory } from '../../actions/registration_actions';
import { participantFormCompleted } from '../../helper/';
import RaisedButton from 'material-ui/RaisedButton';
import { calculateAge } from '../../helper/';

const style = {
	backBtn: {
		marginRight: '24px'
	}
}

class CategorySelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: {},
			earlyBirdValid: false
		}
	}

	componentWillMount() {
		const { event_id } = this.props.match.params;
		const { selectedCategory, participant } = this.props;
		if (!participantFormCompleted(participant)) return this.props.history.push(`/registration/participant/${event_id}`);

		this.props.fetchEvent(event_id, () => {
			const { categories } = this.props.event;
			const selection = _.reduce(categories, function(result, val, key) {
				result[val._id] = false;
				return result;
			}, {});
			// check if any category was previously selected
			// if yes, pre select the category
			if (selectedCategory && selectedCategory.event === event_id) selection[selectedCategory._id] = true;
			this.setState({ selection });

			const { earlyBirdEndDate } = this.props.event;
			
			if (earlyBirdEndDate && new Date(earlyBirdEndDate) > Date.now()) {
				this.setState({ earlyBirdValid: true });
			}
		});
	}

	renderCategoryCard(categories, participant) {
		const participantAge = calculateAge(participant.dateOfBirth);

		return categories.map(category => {
			return(
				<CategoryCard
					category={category}
					key={category._id}
					selected={this.state.selection[category._id]}
					setSelectedCategory={this.setSelectedCategory.bind(this)}
					earlyBirdValid={this.state.earlyBirdValid}
					participantAge={participantAge}
					participantGender={participant.gender}
				/>
			);
		});
	}

	setSelectedCategory(category) {
		const { selectedCategory } = this.props;
		const { selection } = this.state;

		if (selectedCategory) {
			selection[selectedCategory._id] = false;
		}
		this.props.selectCategory(category, () => {
			selection[category._id] = true;
			this.setState({ selection });
		});
	}

	render() {
		const { event, participant } = this.props;
		// disable next button if no category was selected
		const disabled = !Object.values(this.state.selection).includes(true);
		if (!event) {	
			return <CircularProgress />;
		}

		return(
			<div>
				<div>
					<h2>{event.name}</h2>
					<h3>Step 2: Category Selection</h3>
					<h4>Participant Details</h4>
					<p>Name: {participant.fullName}</p>
					<p>Age: {calculateAge(participant.dateOfBirth)}</p>
					<p>Gender: {participant.gender ? "Male" : "Female"}</p>
					{this.renderCategoryCard(event.categories, participant)}
				</div>
				<RaisedButton 
					label="Back"
					secondary={true}
					style={style.backBtn}
					onTouchTap={() => this.props.history.push(`/registration/participant/${event._id}`)}
				/>
				<RaisedButton 
					label="Next"
					primary={true}
					disabled={disabled}
					onTouchTap={() => this.props.history.push(`/registration/meal/${event._id}`)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		selectedCategory: state.registration.selectedCategory,
		participant: state.participant
	};
}

export default connect(mapStateToProps, { fetchEvent, selectCategory })(CategorySelection);