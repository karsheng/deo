import React, { Component } from "react";
import { connect } from 'react-redux';
import CategoryCard from './category_card';
import Progress from "../progress";
import _ from 'lodash';
import { selectCategory } from '../../actions/registration_actions';
import { participantFormCompleted } from '../../helper/';
import RaisedButton from 'material-ui/RaisedButton';
import { calculateAge } from '../../helper/';
import Stepper from './stepper';
import { updateStepper } from '../../actions/stepper_actions';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { fetchCategoriesAvailability } from '../../actions/category_actions';


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

class CategorySelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: {},
			earlyBirdValid: false
		};
	}

	componentWillMount() {
		this.props.updateStepper(1);
		const { event_id } = this.props.match.params;
		if (!this.props.event) this.props.history.push(`/event/${event_id}`);
		this.props.fetchCategoriesAvailability(event_id);
		// const { participant } = this.props;
		
		// if (!participantFormCompleted(participant)) return this.props.history.push(`/registration/participant/${event_id}`);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		const { event_id } = this.props.match.params;
		const { event } = this.props;
		const { selectedCategory } = this.props;
		
		if (event) {
			const { categories } = event;
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
		}
	}
	renderCategoryCard(categories, participant) {
		const participantAge = calculateAge(participant.dateOfBirth);

		return _.map(categories, category => {
			return(
				<div key={category._id}>
					<CategoryCard
						category={category}
						key={category._id}
						selected={this.state.selection[category._id]}
						setSelectedCategory={this.setSelectedCategory.bind(this)}
						earlyBirdValid={this.state.earlyBirdValid}
						participantAge={participantAge}
						participantGender={participant.gender}
					/>
				</div>
			);
		});
	}

	setSelectedCategory(category) {
		const { selectedCategory } = this.props;
		const { selection } = this.state;
		
		// if there is a selectedCategory
		// deselects the selectedCategory and selected new category
		if (selectedCategory) {
			selection[selectedCategory._id] = false;
		}
		
		// update selectedCategory to category or null
		this.props.selectCategory(category, () => {
			// if category is not null
			// update selection
			if (category) {
				selection[category._id] = true;
				this.setState({ selection });
			}
		});
	}

	render() {
		const { event, participant, categories } = this.props;
		// disable next button if no category was selected
		const disabled = !Object.values(this.state.selection).includes(true);
		if (!event || !categories) {	
			return <Progress />;
		}

		return(
			<div>
				<Stepper />
				<Paper zDepth={3} style={style.paper}>
					<h2>{event.name}</h2>
					<h3>Step 2: Category Selection</h3>
					<h5>Participant: {`${participant.fullName} (${participant.gender === true ? "male" : "female"}, ${calculateAge(participant.dateOfBirth)} years old)`} </h5>
					<div className="row">
					{this.renderCategoryCard(categories, participant)}
					</div>
					<br /><br /><br /><br />
					<Divider />
					<br />
					<div>
						<RaisedButton 
							label="Back"
							secondary={true}
							onTouchTap={() => this.props.history.push(`/registration/participant/${event._id}`)}
						/>
						<RaisedButton 
							label="Next"
							primary={true}
							disabled={disabled}
							style={style.nextBtn}
							onTouchTap={() => this.props.history.push(`/registration/meal/${event._id}`)}
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
		participant: state.participant,
		categories: state.categories[ownProps.match.params.event_id]
	};
}

export default connect(mapStateToProps, { selectCategory, updateStepper, fetchCategoriesAvailability })(CategorySelection);