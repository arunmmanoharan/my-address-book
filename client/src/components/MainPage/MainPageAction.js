import { QUERY_GET_PERSON_FAILURE, QUERY_GET_PERSON_REQUEST, QUERY_GET_PERSON_SUCCESS } from './MainPageActionTypes';
import getService from '../../services/dataService';

/**
 * Query Person Data
 */
const queryPersonRequest = () => ({
	type: QUERY_GET_PERSON_REQUEST
});

const queryPersonFailure = error => ({
	type: QUERY_GET_PERSON_FAILURE,
	payload: error
});

const queryPersonSuccess = response => {
	if (response.data) {
		return {
			type: QUERY_GET_PERSON_SUCCESS,
			payload: response.data
		};
	}
	return queryPersonFailure(response);
};

const shouldQueryPerson = () => {
	return true;
};

const queryPerson = (url, id) => {
	const actions = {
		requestAction: queryPersonRequest,
		successAction: queryPersonSuccess,
		failureAction: queryPersonFailure
	};
	const options = {
		actions,
		shouldRequest: shouldQueryPerson
	};

	return getService(url, options, id);
};

export default queryPerson;
