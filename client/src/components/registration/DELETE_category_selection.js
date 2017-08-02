import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEvent } from "../../actions/event_actions";
import { selectCategory } from "../../actions/registration_actions";
import CircularProgress from "material-ui/CircularProgress";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

const style = {
	height: 200,
	width: 200,
	margin: 20,
	textAlign: "center",
	display: "inline-block"
};

class CategorySelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zDepths: [],
			isDisabled: true,
			earlyBirdValid: false,
			hasEarlyBirdRate: false
		};
	}

	selectCategory = (category, i) => {
		this.props.selectCategory(category, () => {
			const newZDepths = this.state.zDepths.map(zDepth => {
				return 1;
			});
			newZDepths[i] = 5;
			this.setState({
				zDepths: newZDepths,
				isDisabled: false
			});
		});
	};

	renderButton(component, isDisabled, buttonText) {
		return (
			<RaisedButton
				disabled={isDisabled}
				primary={true}
				containerElement={component}
			>
				{buttonText}
			</RaisedButton>
		);
	}

	componentWillMount() {
		const { event_id } = this.props.match.params;
		const { selectedCategory } = this.props;

		this.props.fetchEvent(event_id, () => {
			const { categories } = this.props.event;

			const zDepths = categories.map(category => {
				if (selectedCategory && selectedCategory._id === category._id) {
					this.setState({ isDisabled: false });
					return 5;
				}
				return 1;
			});

			this.setState({ zDepths });

			if (this.props.event.earlyBirdEndDate) {
				this.setState({ hasEarlyBirdRate: true });

				if (new Date(this.props.event.earlyBirdEndDate) > Date.now()) {
					this.setState({ earlyBirdValid: true });
				}
			}
		});
	}

	renderCategoryForm(categories) {
		const { earlyBirdValid, hasEarlyBirdRate } = this.state;

		const textStyle = bool => {
			return bool ? {} : { textDecoration: "line-through" };
		};
		const renderPrice = category => {
			if (hasEarlyBirdRate) {
				return (
					<div>
						<h5 style={textStyle(earlyBirdValid)}>
							RM {category.price.earlyBird} (early bird)
						</h5>
						<h5 style={textStyle(!earlyBirdValid)}>
							RM {category.price.normal} (normal)
						</h5>
					</div>
				);
			} else {
				return (
					<h5>
						RM {category.price.normal}
					</h5>
				);
			}
		};

		return categories.map((category, i) => {
			const { zDepths } = this.state;

			return (
				<Paper key={category._id} style={style} zDepth={zDepths[i]}>
					<div style={{ margin: 10 }}>
						<h4>
							{category.name}
						</h4>
						{renderPrice(category)}
						<RaisedButton
							primary={true}
							onTouchTap={this.selectCategory.bind(this, category, i)}
						>
							Select
						</RaisedButton>
					</div>
				</Paper>
			);
		});
	}

	renderCategoryCard(categories) {
		return categories.map((category) => {
			return(
				<CategoryCard 
					category={category}
					key={category._id}
				/>
			);
		});
	}

	render() {
		const { event } = this.props;
		if (!event) {
			return <CircularProgress />;
		}

		const backButtonLink = event => {
			return <Link to={"/event/" + event._id} />;
		};

		const nextButtonLink = event => {
			if (this.state.isDisabled) {
				return "dummyString";
			} else {
				return <Link to={"/registration/meal/" + event._id} />;
			}
		};

		return (
			<div>
				<h2>
					{event.name}
				</h2>
				<h3>Step 1: Select Category</h3>
				<div className="col-xs-12 col-md-6">
					{this.renderCategoryForm(event.categories)}
				</div>
				<br />
				{this.renderButton(backButtonLink(event), false, "Back")}
				<br />
				{this.renderButton(
					nextButtonLink(event),
					this.state.isDisabled,
					"Next"
				)}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		event: state.events[ownProps.match.params.event_id],
		selectedCategory: state.registration.selectedCategory
	};
}

export default connect(mapStateToProps, { fetchEvent, selectCategory })(
	CategorySelection
);
