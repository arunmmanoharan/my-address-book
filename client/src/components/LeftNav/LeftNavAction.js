import {
	GET_PERSON_ID,
	QUERY_GET_PEOPLE_FAILURE,
	QUERY_GET_PEOPLE_REQUEST,
	QUERY_GET_PEOPLE_SUCCESS
} from './LeftNavActionTypes';
import getService from '../../services/dataService';

/**
 * Query People Data
 */
const queryPeopleRequest = () => ({
	type: QUERY_GET_PEOPLE_REQUEST
});

const queryPeopleFailure = error => ({
	type: QUERY_GET_PEOPLE_FAILURE,
	payload: error
});

const queryPeopleSuccess = response => {
	if (response.data) {
		return {
			type: QUERY_GET_PEOPLE_SUCCESS,
			payload: response.data
		};
	}
	return queryPeopleFailure(response);
};

const shouldQueryPeople = () => {
	return true;
};

export const queryPeople = url => {
	const actions = {
		requestAction: queryPeopleRequest,
		successAction: queryPeopleSuccess,
		failureAction: queryPeopleFailure
	};
	const options = {
		actions,
		shouldRequest: shouldQueryPeople
	};

	return getService(url, options);
};


export const getPersonId = id => ({
	type: GET_PERSON_ID,
	payload: id
});
