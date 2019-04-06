import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as types from '../components/LeftNav/LeftNavActionTypes';
import * as actions from '../components/LeftNav/LeftNavAction';
import { mockPeopleData } from './mockData/mockPeopleData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LeftNavAction', () => {
	it('gets People Data Result', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: mockPeopleData
			});
		});

		const expectedActions = [
			{ type: types.QUERY_GET_PEOPLE_REQUEST },
			{
				type: types.QUERY_GET_PEOPLE_SUCCESS,
				payload: mockPeopleData
			}
		];

		const store = mockStore({ payload: {} });

		return store.dispatch(actions.queryPeople('/api/people')).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('gets the selected Person ID', () => {
		const expectedAction = {
			type: types.GET_PERSON_ID,
			payload: 5
		};
		expect(actions.getPersonId(5)).toEqual(expectedAction);
	});
});
