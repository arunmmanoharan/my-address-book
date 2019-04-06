import {combineReducers} from 'redux';
import peopleReducer from '../components/LeftNav/LeftNavReducer';
import getPersonData from '../components/MainPage/MainPageReducer';

export default combineReducers({
	peopleReducer,
	getPersonData
});
