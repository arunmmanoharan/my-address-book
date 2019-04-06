import axios from 'axios';

const getService = (url, options, id) => {
	return async (dispatch) => {
		const {requestAction, successAction, failureAction} = options.actions;

		if (options.shouldRequest) {
			dispatch(requestAction());
			try {
				const response = await axios.get(id ? `http://localhost:8080${url}/${id}` : `http://localhost:8080${url}`);
				if (response.status === 200) {
					return dispatch(successAction(response, dispatch));
				}
				throw response;
			} catch (error) {
				return dispatch(failureAction(error));
			}
		}
		throw new Error('FETCHING');
	};
};

export default getService;
