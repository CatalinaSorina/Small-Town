import React from 'react';

import './NewPerson.css';

class NewPerson extends React.Component {
	constructor() {
		super();
		this.state = {
			person: {
				firstname: '',
				lastname: '',
				house: 0,
				growth: ''
			}
		};
	}

	handleChange = (e) => {
		const property = e.target.name;
		const value = property === 'house' ? Number(e.target.value) : e.target.value;

		console.log(this.state.person);

		this.setState((previousState) => ({
			person: {
				...previousState.person,
				[property]: value
			}
		}));

		console.log(this.state.person);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.person);
		this.props.addPerson(this.state.person);
	};

	render() {
		return (
			<form className="newPerson" onSubmit={this.handleSubmit}>
				<div>
					<label>First name:</label>
					<input name="firstname" onChange={this.handleChange} type="text" placeholder="fill" />
				</div>
				<div>
					<label>Last name:</label>
					<input name="lastname" onChange={this.handleChange} type="text" placeholder="fill" />
				</div>
				<div>
					<label>House:</label>
					<input
						name="house"
						onChange={this.handleChange}
						type="number"
						placeholder="fill the house number"
					/>
				</div>
				<div>
					<label>Growth:</label>
					<select name="growth" onChange={this.handleChange}>
						<option>choose</option>
						<option>kid</option>
						<option>teenager</option>
						<option>adult</option>
						<option>old</option>
					</select>
				</div>
				<button>Add person</button>
			</form>
		);
	}
}

export default NewPerson;
