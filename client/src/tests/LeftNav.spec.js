import React from 'react';
import { shallow } from 'enzyme';
import { orderBy } from 'lodash';
import LeftNavPage from '../components/LeftNav/LeftNavPage';
import { mockPeopleData } from './mockData/mockPeopleData';

const parentFunctions = {
	getPeopleData: () => {}
};

describe('Left Nav Page', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<LeftNavPage
				peopleData={orderBy(mockPeopleData.people, ['name'], 'asc')}
				getPeopleData={parentFunctions.getPeopleData}
			/>
		);
		expect(wrapper.find('.app-directory-container')).toHaveLength(1);
	});
});
