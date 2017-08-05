import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import { connect } from "react-redux";
import { fetchSpecificEvents } from "../../actions/event_actions";
import MenuItem from "material-ui/MenuItem";
import { STATESNAME } from "../../constants";

const style = {
	selectField: { 
		maxWidth: '176px',
		marginRight: '30px' 
	}
};

class EventFilter extends Component {
	handleTypeChange(e, i, val) {
		let { type } = this.props.state;
		type = val;
		this.props.fetchSpecificEvents(type, () => {
			this.props.setFilter(e, { ...this.props.state, type });
		});
	}

	handleDistanceChange(e, i, val) {
		let { distance } = this.props.state;
		distance = val;
		this.props.setFilter(e, { ...this.props.state, distance });
	}

	handleMonthChange(e, i, val) {
		let { month } = this.props.state;
		month = val;
		this.props.setFilter(e, { ...this.props.state, month });
	}

	handleStateNameChange(e, i, val) {
		let { stateName } = this.props.state;
		stateName = val;
		this.props.setFilter(e, { ...this.props.state, stateName });
	}

	render() {
		const { type, distance, month, stateName } = this.props.state;
		return (
			<div className="col-xs-12">
				<SelectField
					style={style.selectField}
					floatingLabelText="Select type"
					value={type}
					onChange={this.handleTypeChange.bind(this)}
				>
					<MenuItem value="any" primaryText="Any" />
					<MenuItem value="run" primaryText="Run" />
					<MenuItem value="swimming" primaryText="Swimming" />
					<MenuItem value="cycling" primaryText="Cycling" />
					<MenuItem value="multisports" primaryText="Multisports" />
					<MenuItem value="obstacle" primaryText="Obstacle Race" />
				</SelectField>
				<SelectField
					style={style.selectField}
					floatingLabelText="Select distance"
					value={distance}
					onChange={this.handleDistanceChange.bind(this)}
				>
					<MenuItem value={0} primaryText="All" />
					<MenuItem value={5} primaryText="5km and below" />
					<MenuItem value={10} primaryText="5km to 10km" />
					<MenuItem value={21} primaryText="10km to 21km" />
					<MenuItem value={42} primaryText="21km to 42km" />
					<MenuItem value={9999} primaryText="42km and above" />
				</SelectField>
				<SelectField
					style={style.selectField}
					floatingLabelText="Select month"
					value={month}
					onChange={this.handleMonthChange.bind(this)}
				>
					<MenuItem value={9999} primaryText="Any" />
					<MenuItem value={0} primaryText="January" />
					<MenuItem value={1} primaryText="February" />
					<MenuItem value={2} primaryText="March" />
					<MenuItem value={3} primaryText="April" />
					<MenuItem value={4} primaryText="May" />
					<MenuItem value={5} primaryText="June" />
					<MenuItem value={6} primaryText="July" />
					<MenuItem value={7} primaryText="August" />
					<MenuItem value={8} primaryText="September" />
					<MenuItem value={9} primaryText="October" />
					<MenuItem value={10} primaryText="November" />
					<MenuItem value={11} primaryText="December" />
				</SelectField>
				<SelectField
					style={style.selectField}
					floatingLabelText="Select state"
					value={stateName}
					onChange={this.handleStateNameChange.bind(this)}
				>
					<MenuItem value="any" primaryText="Any" />
					{STATESNAME.map(stateName => {
						return (
							<MenuItem
								key={stateName}
								value={stateName}
								primaryText={stateName}
							/>
						);
					})}
				</SelectField>
			</div>
		);
	}
}

export default connect(null, { fetchSpecificEvents })(EventFilter);
