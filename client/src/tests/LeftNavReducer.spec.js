import { orderBy } from 'lodash';
import * as reducers from '../components/LeftNav/LeftNavReducer';
import * as types from '../components/LeftNav/LeftNavActionTypes';
import { mockPeopleData } from './mockData/mockPeopleData';

describe('Left Nav Reducer ', () => {
	describe('gets People data ', () => {
		it('should return the initial state', () => {
			expect(reducers.getPeople(undefined, {})).toEqual({
				data: [],
				isFetching: false
			});
		});

		it('should start fetching people data', () => {
			expect(
				reducers.getPeople(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PEOPLE_REQUEST
					}
				)
			).toEqual({
				data: [],
				isFetching: true
			});
		});

		it('should fetch people data Success', () => {
			expect(
				reducers.getPeople(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PEOPLE_SUCCESS,
						payload: mockPeopleData
					}
				)
			).toEqual({
				data: orderBy(mockPeopleData.people, ['name'], 'asc'),
				isFetching: false
			});
		});

		it('should fetch people data Failure', () => {
			expect(
				reducers.getPeople(
					{
						data: [],
						isFetching: false
					},
					{
						type: types.QUERY_GET_PEOPLE_FAILURE
					}
				)
			).toEqual({
				data: [],
				isFetching: false
			});
		});
	});

	describe('gets person ID', () => {
		it('should return the initial state', () => {
			expect(reducers.getPersonID(undefined, {})).toEqual({
				id: 1
			});
		});

		it('should get manage User ID', () => {
			expect(
				reducers.getPersonID(
					{
						id: 1
					},
					{
						type: types.GET_PERSON_ID,
						payload: 1
					}
				)
			).toEqual({
				id: 1
			});
		});
	});
});
