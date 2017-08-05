import React, { Component } from "react";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

const style = {
	height: 200,
	width: "100%",
	maxWidth: "168px",
	textAlign: "center",
	display: "inline-block",
};

const disabledStyle = {
	height: 200,
	width: "100%",
	maxWidth: "168px",
	textAlign: "center",
	display: "inline-block",
	backgroundColor: "grey"
}

class CategoryCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			available: true,
			disabled: true
		};
	}

	componentWillMount() {
		const { category, participantAge, participantGender } = this.props;
		if (
				participantAge >= category.ageMin &&
				participantAge <= category.ageMax &&
				participantGender === category.gender
			) {
			this.setState({ disabled: false });
		}
	}

	handleSelection() {
		const { category } = this.props;
		this.props.setSelectedCategory(category);
	}

	render() {
		const { available } = this.state;
		const { category, selected, earlyBirdValid } = this.props;

		return (
			<div className="col-xs-6 col-md-3">
				<Paper style={this.state.disabled ? disabledStyle : style} zDepth={selected ? 5 : 1}>
					<div style={{ margin: 10 }}>
						<h4>
							{category.name}
						</h4>
						<h5>
							{earlyBirdValid
								? `RM ${category.price.earlyBird} (early bird)`
								: `RM ${category.price.normal}`}
						</h5>
						<FlatButton
							primary={true}
							disabled={this.state.disabled}
							label="Select"
							onTouchTap={this.handleSelection.bind(this)}
						/>
					</div>
				</Paper>
			</div>
		);
	}
}

export default CategoryCard;
