import React from 'react';
import { shallow } from 'enzyme';
import Page from '../components/MainPage/Page';
import { mockPersonData } from './mockData/mockPeopleData';

const parentFunctions = {
	queryPerson: () => {}
};

describe('Main Page', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Page queryPerson={parentFunctions.queryPerson} personData={mockPersonData.person} />);
		expect(wrapper.find('.app-person-profile-container')).toHaveLength(1);
	});
});
