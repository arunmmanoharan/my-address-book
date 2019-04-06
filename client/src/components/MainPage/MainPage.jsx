import { connect } from 'react-redux';
import { get } from 'lodash';
import queryPerson from './MainPageAction';
import Page from './Page';

const mapStateToProps = state => {
	return {
		personId: state.peopleReducer.getPersonID.id,
		personData: get(state.getPersonData.data, 'person')
	};
};

const mapDispatchToProps = dispatch => ({ queryPerson: (url, id) => dispatch(queryPerson(url, id)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
