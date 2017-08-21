import React, { Component } from 'react';
import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

class EventCategoryTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasEarlyBirdRate: false
		};
	}
	componentWillMount() {
		const { event } = this.props;
		if (event.earlyBirdEndDate) {
			this.setState({ hasEarlyBirdRate: true });
		}
	}

	renderEarlyBirdHeaderColumn(style) {
		if (this.state.hasEarlyBirdRate) {
			return (
				<TableHeaderColumn style={style}>Early Bird (RM)</TableHeaderColumn>
			);
		}

		return null;
	}
	renderCategoryRowColumn(style) {
		const { event } = this.props;
		return event.categories.map(category => {
			if (!this.state.hasEarlyBirdRate) {
				return (
					<TableRow key={category._id}>
						<TableRowColumn style={style.categoryColumn}>
							{category.name}
						</TableRowColumn>
						<TableRowColumn style={style.priceColumns}>
							{category.price.normal}
						</TableRowColumn>
					</TableRow>
				);
			} else {
				return (
					<TableRow key={category._id}>
						<TableRowColumn style={style.categoryColumn}>
							{category.name}
						</TableRowColumn>
						<TableRowColumn style={style.priceColumns}>
							{category.price.earlyBird}
						</TableRowColumn>
						<TableRowColumn style={style.priceColumns}>
							{category.price.normal}
						</TableRowColumn>
					</TableRow>
				);
			}
		});
	}

	render() {
		const style = {
			categoryColumn: {
				width: this.state.hasEarlyBirdRate ? '40%' : '75%',
				whiteSpace: 'normal',
				wordWrap: 'break-word'
			},
			priceColumns: {
				whiteSpace: 'normal',
				wordWrap: 'break-word'
			}
		};

		return (
			<div style={{ overflowX: 'auto' }}>
				<Table>
					<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn style={style.categoryColumn}>
								Category
							</TableHeaderColumn>
							{this.renderEarlyBirdHeaderColumn(style.priceColumns)}
							<TableHeaderColumn style={style.priceColumns}>
								Normal (RM)
							</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} showRowHover={true}>
						{this.renderCategoryRowColumn(style)}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export default EventCategoryTable;
