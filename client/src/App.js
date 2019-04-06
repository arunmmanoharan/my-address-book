import React from 'react';
import NavBar from './components/NavBar/NavBar';
import LeftNav from './components/LeftNav/LeftNav';
import MainPage from './components/MainPage/MainPage';
import './App.scss';

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<NavBar/>
				<LeftNav/>
				<MainPage/>
			</header>
		</div>
	);
};

export default App;
