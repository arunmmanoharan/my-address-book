import {QUERY_GET_PERSON_FAILURE, QUERY_GET_PERSON_REQUEST, QUERY_GET_PERSON_SUCCESS} from './MainPageActionTypes';

/**
 * Get People Data
 * @type {{data: Array, isFetching: boolean}}
 */
const initialPersonData = {
	data: [],
	isFetching: false
};

const getPersonData = (state = initialPersonData, action) => {
	switch (action.type) {
		case QUERY_GET_PERSON_REQUEST: {
			return {
				...state,
				isFetching: true
			};
		}

		case QUERY_GET_PERSON_SUCCESS: {
			return {
				data: action.payload,
				isFetching: false
			};
		}

		case QUERY_GET_PERSON_FAILURE: {
			return {
				...state,
				isFetching: false
			};
		}
		default:
			return state;
	}
};

export default getPersonData;
