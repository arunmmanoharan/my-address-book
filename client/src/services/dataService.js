import axios from 'axios';

const getService = (url, options, id) => {
	return async dispatch => {
		const { requestAction, successAction, failureAction } = options.actions;

		if (options.shouldRequest) {
			dispatch(requestAction());
			try {
				const response = await axios.get(id ? `${url}/${id}` : `${url}`);
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
