import { combineReducers } from 'redux';
import { orderBy } from 'lodash';
import {
	QUERY_GET_PEOPLE_SUCCESS,
	QUERY_GET_PEOPLE_REQUEST,
	QUERY_GET_PEOPLE_FAILURE,
	GET_PERSON_ID
} from './LeftNavActionTypes';

/**
 * Get People Data
 * @type {{data: Array, isFetching: boolean}}
 */
const initialPeopleData = {
	data: [],
	isFetching: false
};

const getPeople = (state = initialPeopleData, action) => {
	switch (action.type) {
		case QUERY_GET_PEOPLE_REQUEST: {
			return {
				...state,
				isFetching: true
			};
		}

		case QUERY_GET_PEOPLE_SUCCESS: {
			return {
				data: orderBy(action.payload.people, ['name'], 'asc'),
				isFetching: false
			};
		}

		case QUERY_GET_PEOPLE_FAILURE: {
			return {
				...state,
				isFetching: false
			};
		}
		default:
			return state;
	}
};

/**
 * Get Person ID
 * @type {{id: number}}
 */
const initialPersonId = {
	id: 1
};

const getPersonID = (state = initialPersonId, action) => {
	switch (action.type) {
		case GET_PERSON_ID: {
			return {
				...state,
				id: action.payload
			};
		}

		default:
			return state;
	}
};

const peopleReducer = combineReducers({
	getPeople,
	getPersonID
});

export default peopleReducer;
