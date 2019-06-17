import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import People from './components/People';
import NewPerson from './components/NewPerson';

import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			people: []
		};
	}

	render() {
		return (
			<div className="App">
				<nav>
					<NavLink to="/new">New person</NavLink>
					<NavLink to="/people">People</NavLink>
					<NavLink to="/">Home</NavLink>
				</nav>
				<div>
					<Route path="/" component={Home} />
					<Route path="/people" render={() => <People people={this.state.people} />} />
					<Route path="/new" component={NewPerson} />
				</div>
			</div>
		);
	}
}

export default App;
