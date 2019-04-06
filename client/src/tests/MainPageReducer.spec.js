import getPersonData from '../components/MainPage/MainPageReducer';
import * as types from '../components/MainPage/MainPageActionTypes';
import { mockPersonData } from './mockData/mockPeopleData';

describe('Main Page Reducer ', () => {
	describe('gets Person data ', () => {
		it('should return the initial state', () => {
			expect(getPersonData(undefined, {})).toEqual({
				data: [],
				isFetching: false
			});
		});

		it('should start fetching person data', () => {
			expect(
				getPersonData(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PERSON_REQUEST
					}
				)
			).toEqual({
				data: [],
				isFetching: true
			});
		});

		it('should fetch person data Success', () => {
			expect(
				getPersonData(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PERSON_SUCCESS,
						payload: mockPersonData
					}
				)
			).toEqual({
				data: mockPersonData,
				isFetching: false
			});
		});

		it('should fetch person data Failure', () => {
			expect(
				getPersonData(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PERSON_FAILURE
					}
				)
			).toEqual({
				data: [],
				isFetching: false
			});
		});
	});
});
