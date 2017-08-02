import React, { Component } from "react";
import { connect } from 'react-redux';
import CategoryCard from './category_card';
import CircularProgress from "material-ui/CircularProgress";
import { fetchEvent } from "../../actions/event_actions";
import _ from 'lodash';
import { selectCategory } from '../../actions/registration_actions';

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
		const { selectedCategory } = this.props;
		this.props.fetchEvent(event_id, () => {
			const { categories } = this.props.event;
			const selection = _.reduce(categories, function(result, val, key) {
				result[val._id] = false;
				return result;
			}, {});
			if (selectedCategory) selection[selectedCategory._id] = true;
			this.setState({ selection });

			const { earlyBirdEndDate } = this.props.event;
			
			if (earlyBirdEndDate && new Date(earlyBirdEndDate) > Date.now()) {
				this.setState({ earlyBirdValid: true });
			}
		});
	}

	renderCategoryCard(categories) {
		return categories.map(category => {
			return(
				<CategoryCard
					category={category}
					key={category._id}
					selected={this.state.selection[category._id]}
					setSelectedCategory={this.setSelectedCategory.bind(this)}
					earlyBirdValid={this.state.earlyBirdValid}
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
		const { event } = this.props;
		
		if (!event) {	
			return <CircularProgress />;
		}

		return(
			<div>
				<div className="col-xs-12 col-md-8">
					<h3>Category Selection</h3>
					{this.renderCategoryCard(event.categories)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		selectedCategory: state.registration.selectedCategory,
	};
}

export default connect(mapStateToProps, { fetchEvent, selectCategory })(CategorySelection);