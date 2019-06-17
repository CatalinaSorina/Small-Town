import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';

import './App.css';

function App() {
	return (
		<div className="App">
			<nav>
				<NavLink to="/">Home</NavLink>
			</nav>
			<div>
				<Route path='/' component={Home} />
			</div>
		</div>
	);
}

export default App;
