import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import expect from 'expect';
import rootReducer from '../reducers';
import App from '../App';
import NavBar from '../components/NavBar/NavBar';
import LeftNavPage from '../components/LeftNav/LeftNavPage';
import Page from '../components/MainPage/Page';

const mockStore = preloadedState => {
	return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

const store = mockStore();

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});

describe('App ', () => {
	it('has header ', () => {
		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(wrapper.find('.App-header')).toHaveLength(1);
	});

	it('renders NavBar', () => {
		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(wrapper.find(NavBar)).toHaveLength(1);
	});

	it('renders LeftNav', () => {
		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(wrapper.find(LeftNavPage)).toHaveLength(1);
	});

	it('renders MainPage', () => {
		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(wrapper.find(Page)).toHaveLength(1);
	});
});
