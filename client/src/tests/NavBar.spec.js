import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../components/NavBar/NavBar';

describe('NavBar component', () => {
	it('has div', () => {
		const wrapper = shallow(<NavBar />);
		expect(wrapper.find('.navBar')).toHaveLength(1);
	});
});
