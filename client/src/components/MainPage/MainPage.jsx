import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import {get, orderBy, uniqueId} from 'lodash';
import {queryPerson} from './MainPageAction';

class MainPage extends Component {

	componentDidMount() {
		this.getPersonData();
	}

	getPersonData = () => {
		this.props.queryPerson('/api/people', this.props.personId);
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.personId !== this.props.personId) {
			this.getPersonData();
		}
	}

	render() {
		return (
			<div className="app-person-profile-container">
				<div className="app-person-profile docs-highlight docs-blue" data-intro="Person Profile"
					 data-position="bottom">
					<div className="app-person-profile-header">
						<Avatar className={'app-person-profile-photo'}
								name={this.props.personData && this.props.personData.name} size="100" round={true}
								src={this.props.personData && this.props.personData.profile}/>
						<h2>{this.props.personData && this.props.personData.name}</h2>
						<div className="app-person-profile-department">
							{this.props.personData && this.props.personData.title}
						</div>
						<div className="app-person-profile-phone-number">
							<a href={`tel:${this.props.personData && this.props.personData.phone}`}>{this.props.personData && this.props.personData.phone}</a>
						</div>
						<div className="app-person-profile-phone-number">
							<a href={`mailto:${this.props.personData && this.props.personData.email}`}>{this.props.personData && this.props.personData.email}</a>
						</div>
					</div>

					<div className="app-section">
						<div className="app-section-header">
							<h3>About</h3>
						</div>
						<div className="app-section-body">
							<div className="app-history-item-body">
								{this.props.personData && this.props.personData.about}
							</div>
						</div>
					</div>

					<div className="app-section">
						<div className="app-section-header">
							<h3>Education</h3>
						</div>
						<div className="app-section-body">
							{this.props.personData && orderBy(this.props.personData.education, ['startYear'], 'desc').map((item) => (
									<Fragment key={uniqueId()}>
										<div className="app-history-item">
											<div className="app-history-item-dates">
												{item.startYear} - {item.endYear || 'Present'}
											</div>
											<div className="app-history-item-body">
												<div className="app-history-item-title">{item.institution}</div>
												{item.degree}
											</div>

										</div>
									</Fragment>
								)
							)}
						</div>
					</div>

					<div className="app-section">
						<div className="app-section-header">
							<h3>Experience</h3>
						</div>
						<div className="app-section-body">
							{this.props.personData && orderBy(this.props.personData.workExperience, ['startYear'], 'desc').map((item) => (
									<Fragment key={uniqueId()}>
										<div className="app-history-item">
											<div className="app-history-item-dates">
												{item.startYear} - {item.endYear || 'Present'}
											</div>
											<div className="app-history-item-body">
												<div className="app-history-item-title">{item.institution}</div>
												{item.title}
											</div>

										</div>
									</Fragment>
								)
							)}
						</div>
					</div>

					{this.props.personData && this.props.personData.publications && <div className="app-section">
						<div className="app-section-header">
							<h3>Projects</h3>
						</div>
						<div className="app-section-body">
							{this.props.personData.publications.map((item) => (
									<Fragment key={uniqueId()}>
										<div className="app-history-item">
											<div className="app-history-item-body">
												<div className="app-history-item-title"><a href={item.website}
																						   target={'_blank'}>{item.name}</a>
												</div>
												{item.summary}
											</div>

										</div>
									</Fragment>
								)
							)}
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		personId: state.peopleReducer.getPersonID.id,
		personData: get(state.getPersonData.data, 'person')
	};
};

const mapDispatchToProps = dispatch =>
	({queryPerson: (url, id) => dispatch(queryPerson(url, id))});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
