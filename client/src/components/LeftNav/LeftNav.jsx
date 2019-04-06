import { connect } from 'react-redux';
import { getPersonId, queryPeople } from './LeftNavAction';
import LeftNavPage from './LeftNavPage';

const mapStateToProps = state => {
	return {
		peopleData: state.peopleReducer.getPeople.data
	};
};

const mapDispatchToProps = dispatch => ({
	getPeopleData: url => dispatch(queryPeople(url)),
	getPersonId: id => dispatch(getPersonId(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeftNavPage);
