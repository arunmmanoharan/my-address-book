import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = preloadedState => {
	return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));
};

export default store;
