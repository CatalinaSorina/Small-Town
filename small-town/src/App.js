import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import People from './components/People';
import NewPerson from './components/NewPerson';
import ModifyPerson from './components/ModifyPerson';

import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			people: [],
			activePerson: null
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3100/people')
			.then((result) => {
				this.setState({ people: result.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	addPerson(person) {
		axios
			.post('http://localhost:3100/people', person)
			.then((result) => {
				this.setState({ people: result.data });
				this.props.history.push('/people');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	remove = (id) => {
		axios
			.delete(`http://localhost:3100/people/${id}`)
			.then((result) => {
				this.setState({ people: result.data });
				this.props.history.push('/people');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	modify = (person) => {
		this.setState({ activePerson: person });
		this.props.history.push('/modify');
	};

	modifyPerson = (person) => {
		axios
			.put(`http://localhost:3100/people/${person.id}`, person)
			.then((result) => {
				this.setState({ people: result.data });
				this.props.history.push('/people');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="App">
				<nav>
					<NavLink to="/new">New person</NavLink>
					<NavLink to="/people">People</NavLink>
					<NavLink to="/">Home</NavLink>
				</nav>
				<div>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/people"
						render={() => <People people={this.state.people} remove={this.remove} modify={this.modify} />}
					/>
					<Route exact path="/new" render={() => <NewPerson addPerson={this.addPerson} />} />
					<Route
						exact
						path="/modify"
						render={() => (
							<ModifyPerson person={this.state.activePerson} modifyPerson={this.modifyPerson} />
						)}
					/>
				</div>
			</div>
		);
	}
}

export default App;
