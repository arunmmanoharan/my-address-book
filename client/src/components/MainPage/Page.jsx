import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { orderBy, uniqueId } from 'lodash';

class Page extends PureComponent {
	componentDidMount() {
		this.getPersonData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.personId !== this.props.personId) {
			this.getPersonData();
		}
	}

	getPersonData = () => {
		this.props.queryPerson('/api/people', this.props.personId);
	};

	render() {
		return (
			<div className="app-person-profile-container">
				<div
					className="app-person-profile docs-highlight docs-blue"
					data-intro="Person Profile"
					data-position="bottom"
				>
					<div className="app-person-profile-header">
						<Avatar
							className="app-person-profile-photo"
							name={this.props.personData && this.props.personData.name}
							size="100"
							round
							src={this.props.personData && this.props.personData.profile}
						/>
						<h2>{this.props.personData && this.props.personData.name}</h2>
						<div className="app-person-profile-department">
							{this.props.personData && this.props.personData.title}
						</div>
						<div className="app-person-profile-phone-number">
							<a
								href={`tel:${this.props.personData && this.props.personData.phone}`}
								rel="noopener noreferrer"
							>
								{this.props.personData && this.props.personData.phone}
							</a>
						</div>
						<div className="app-person-profile-phone-number">
							<a
								href={`mailto:${this.props.personData && this.props.personData.email}`}
								rel="noopener noreferrer"
							>
								{this.props.personData && this.props.personData.email}
							</a>
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
							{this.props.personData &&
								orderBy(this.props.personData.education, ['startYear'], 'desc').map(item => (
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
								))}
						</div>
					</div>

					<div className="app-section">
						<div className="app-section-header">
							<h3>Experience</h3>
						</div>
						<div className="app-section-body">
							{this.props.personData &&
								orderBy(this.props.personData.workExperience, ['startYear'], 'desc').map(item => (
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
								))}
						</div>
					</div>

					{this.props.personData && this.props.personData.publications && (
						<div className="app-section">
							<div className="app-section-header">
								<h3>Projects</h3>
							</div>
							<div className="app-section-body">
								{this.props.personData.publications.map(item => (
									<Fragment key={uniqueId()}>
										<div className="app-history-item">
											<div className="app-history-item-body">
												<div className="app-history-item-title">
													<a href={item.website} target="_blank" rel="noopener noreferrer">
														{item.name}
													</a>
												</div>
												{item.summary}
											</div>
										</div>
									</Fragment>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

Page.propTypes = {
	personData: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		title: PropTypes.string,
		phone: PropTypes.string,
		email: PropTypes.string,
		profile: PropTypes.string,
		about: PropTypes.string,
		education: PropTypes.arrayOf(
			PropTypes.shape({
				institution: PropTypes.string,
				startYear: PropTypes.number,
				endYear: PropTypes.number,
				degree: PropTypes.string
			})
		),
		institution: PropTypes.arrayOf(
			PropTypes.shape({
				institution: PropTypes.string,
				startYear: PropTypes.number,
				title: PropTypes.string
			})
		),
		publications: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				publisher: PropTypes.string,
				website: PropTypes.string,
				summary: PropTypes.string
			})
		)
	})
};

export default Page;
