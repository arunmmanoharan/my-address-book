import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import * as types from '../components/MainPage/MainPageActionTypes';
import queryPerson from '../components/MainPage/MainPageAction';
import { mockPersonData } from './mockData/mockPeopleData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MainPageAction', () => {
	it('gets Person Data Result', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: mockPersonData
			});
		});

		const expectedActions = [
			{ type: types.QUERY_GET_PERSON_REQUEST },
			{
				type: types.QUERY_GET_PERSON_SUCCESS,
				payload: mockPersonData
			}
		];

		const store = mockStore({ payload: {} });

		return store.dispatch(queryPerson('/api/people', 1)).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
