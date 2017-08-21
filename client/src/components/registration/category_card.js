import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const style = {
	enabled: {
		height: 200,
		width: '100%',
		maxWidth: '168px',
		textAlign: 'center',
		display: 'inline-block'
	},
	disabled: {
		height: 200,
		width: '100%',
		maxWidth: '168px',
		textAlign: 'center',
		display: 'inline-block',
		backgroundColor: '#B0B0B0'
	},
	available: {
		color: 'green'
	},
	unavailable: {
		color: 'red'
	}
};

class CategoryCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

		if (!category.available) {
			this.setState({ disabled: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected && this.state.disabled) {
			nextProps.setSelectedCategory(null);
		}
	}

	handleSelection() {
		const { category } = this.props;
		this.props.setSelectedCategory(category);
	}

	render() {
		const { category, selected, earlyBirdValid } = this.props;
		const { available } = category;

		return (
			<div className="col-xs-6 col-md-3">
				<Paper
					style={this.state.disabled ? style.disabled : style.enabled}
					zDepth={selected ? 5 : 1}
				>
					<div style={{ margin: 10 }}>
						<h4>
							{category.name}
						</h4>
						<h5>
							{earlyBirdValid
								? `RM ${category.price.earlyBird} (early bird)`
								: `RM ${category.price.normal}`}
						</h5>
						<h5 style={available ? style.available : style.unavailable}>
							{available ? 'Available' : 'Not Available'}
						</h5>
						<FlatButton
							primary={true}
							disabled={this.state.disabled}
							label={selected ? 'SELECTED' : 'SELECT'}
							onTouchTap={this.handleSelection.bind(this)}
						/>
					</div>
				</Paper>
			</div>
		);
	}
}

export default CategoryCard;
