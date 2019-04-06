import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getPersonId, queryPeople} from './LeftNavAction';
import {isEmpty, orderBy, uniq, uniqueId} from 'lodash';
import './LeftNav.scss';

class LeftNav extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			peopleData: props.peopleData,
			sortOrder: 'desc',
			searchTerm: '',
			tooltipOpen: false
		};
	}

	componentDidMount() {
		this.props.getPeopleData('/api/people');
	}

	handleClick = (e) => {
		this.props.getPersonId(e);
	};

	handleSort = (e) => {
		this.setState({
			peopleData: orderBy(this.props.peopleData, ['name'], e),
			sortOrder: e === 'asc' ? 'desc' : 'asc',
		});
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.peopleData !== this.props.peopleData) {
			this.setState({
				peopleData: this.props.peopleData
			});
		}
	}

	onSearchChange = (e) => {
		if (e) {
			this.setState({
				peopleData: this.props.peopleData.filter(arr => arr.name.match(new RegExp(e.target.value, 'i')) !== null),
				searchTerm: e.target.value
			});
		} else {
			this.setState({
				peopleData: this.props.peopleData
			});
		}
	};

	clearInput = () => {
		this.setState({searchTerm: ''});
		this.onSearchChange();
	};

	toggleToolTip = () => {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	};

	render() {
		const titleArray = uniq(this.state.peopleData.map((item) => item.name.slice(0, 1)));
		const peopleData = titleArray.map(item => {
			return {
				[item]: this.state.peopleData.filter((people) => people.name[0] === item)
			};
		});

		return (
			<div className="app-directory-container">
				<span className={'inputContainer'}>
					      <InputGroup>
					<Input className={'searchInput'} placeholder={'Search'} onChange={this.onSearchChange}
						   value={this.state.searchTerm}/>
					        <InputGroupAddon addonType="append" className={'clearInput'}
											 onClick={this.clearInput}>x</InputGroupAddon>
						  </InputGroup>
					{this.state.sortOrder === 'desc' && <button type={'button'} onClick={() => this.handleSort('desc')} title={'Sort Descending'}>
						<FontAwesomeIcon icon={'sort-amount-down'}/>
					</button>}
					{this.state.sortOrder === 'asc' && <button type={'button'} onClick={() => this.handleSort('asc')} title={'Sort Ascending'}>
						<FontAwesomeIcon icon={'sort-amount-up'}/>
					</button>}
				</span>
				<div className="app-directory">
					{titleArray.map(item => {
						return (
							<Fragment key={uniqueId()}>
								<div key={uniqueId()} className="app-directory-separator">{item}</div>
								{peopleData.map((people) => {
									return (
										<Fragment key={uniqueId()}>
											{!isEmpty(people[item]) && people[item].map((person) => {
												return (
													<div key={uniqueId()}
														 className="app-directory-item"
														 onClick={() => this.handleClick(person.id)}> {person.name} </div>
												);
											})}
										</Fragment>
									);
								})}

							</Fragment>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		peopleData: state.peopleReducer.getPeople.data
	};
};

const mapDispatchToProps = dispatch => ({
	getPeopleData: (url) => dispatch(queryPeople(url)),
	getPersonId: (id) => dispatch(getPersonId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
