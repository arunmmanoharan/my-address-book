import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty, orderBy, uniq, uniqueId } from 'lodash';
import './LeftNav.scss';

class LeftNavPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			peopleData: props.peopleData,
			sortOrder: 'desc',
			searchTerm: ''
		};
	}

	componentDidMount() {
		this.props.getPeopleData('/api/people');
	}

	componentDidUpdate(prevProps) {
		if (prevProps.peopleData !== this.props.peopleData) {
			this.setState({
				peopleData: this.props.peopleData
			});
		}
	}

	handleClick = e => {
		this.props.getPersonId(e);
	};

	handleSort = e => {
		this.setState({
			peopleData: orderBy(this.props.peopleData, ['name'], e),
			sortOrder: e === 'asc' ? 'desc' : 'asc'
		});
	};

	onSearchChange = e => {
		if (e) {
			this.setState({
				peopleData: this.props.peopleData.filter(
					arr => arr.name.match(new RegExp(e.target.value, 'i')) !== null
				),
				searchTerm: e.target.value
			});
		} else {
			this.setState({
				peopleData: this.props.peopleData
			});
		}
	};

	clearInput = () => {
		this.setState({ searchTerm: '' });
		this.onSearchChange();
	};

	render() {
		const titleArray = uniq(this.state.peopleData.map(item => item.name.charAt(0)));
		const peopleData = titleArray.map(item => {
			return {
				key: item,
				people: this.state.peopleData.filter(people => people.name[0] === item)
			};
		});

		return (
			<div className="app-directory-container">
				<span className="inputContainer">
					<InputGroup>
						<Input
							className="searchInput"
							placeholder="Search"
							onChange={this.onSearchChange}
							value={this.state.searchTerm}
						/>
						<InputGroupAddon addonType="append" className="clearInput" onClick={this.clearInput}>
							x
						</InputGroupAddon>
					</InputGroup>
					{this.state.sortOrder === 'desc' && (
						<button type="button" onClick={() => this.handleSort('desc')} title="Sort Descending">
							<FontAwesomeIcon icon="sort-amount-down" />
						</button>
					)}
					{this.state.sortOrder === 'asc' && (
						<button type="button" onClick={() => this.handleSort('asc')} title="Sort Ascending">
							<FontAwesomeIcon icon="sort-amount-up" />
						</button>
					)}
				</span>
				<div className="app-directory">
					<Fragment>
						{peopleData.map(category => {
							return (
								<Fragment key={uniqueId()}>
									<div key={uniqueId()} className="app-directory-separator">
										{category.key}
									</div>
									{!isEmpty(category.people) &&
										category.people.map(person => {
											return (
												<div
													role="button"
													tabIndex={0}
													key={uniqueId()}
													className="app-directory-item"
													onClick={() => this.handleClick(person.id)}
													onKeyDown={() => {}}
												>
													{' '}
													{person.name}{' '}
												</div>
											);
										})}
								</Fragment>
							);
						})}
					</Fragment>
				</div>
			</div>
		);
	}
}

LeftNavPage.propTypes = {
	peopleData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			getPeopleData: PropTypes.func,
			getPersonId: PropTypes.func
		})
	)
};

export default LeftNavPage;
