import React from 'react';

import './ModifyPerson.css';

class ModifyPerson extends React.Component {
	constructor() {
		super();
		this.state = {
			person: null
		};
	}

	componentDidMount() {
		this.setState({ person: this.props.person });
	}

	handleChange = (e) => {
		const property = e.target.name;
		const value = property === 'house' ? Number(e.target.value) : e.target.value;

		// console.log(this.state.person);

		this.setState((previousState) => ({
			person: {
				...previousState.person,
				[property]: value
			}
		}));

		// console.log(this.state.person);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log(this.state.person);
		this.props.modifyPerson(this.state.person);
	};

	render() {
		return this.state.person ? (
			<form className="modifyPerson" onSubmit={this.handleSubmit}>
				<div>
					<label>First name:</label>
					<input
						name="firstname"
						onChange={this.handleChange}
						type="text"
						value={this.state.person.firstname}
					/>
				</div>
				<div>
					<label>Last name:</label>
					<input
						name="lastname"
						onChange={this.handleChange}
						type="text"
						value={this.state.person.lastname}
					/>
				</div>
				<div>
					<label>Portret link:</label>
					<input name="portret" onChange={this.handleChange} type="text" value={this.state.person.portret} />
				</div>
				<div>
					<label>House:</label>
					<input name="house" onChange={this.handleChange} type="number" value={this.state.person.house} />
				</div>
				<div>
					<label>Growth:</label>
					<select name="growth" onChange={this.handleChange}>
						<option>{this.state.person.growth}</option>
						<option>kid</option>
						<option>teenager</option>
						<option>adult</option>
						<option>old</option>
					</select>
				</div>
				<button>Modify person</button>
			</form>
		) : (
			''
		);
	}
}

export default ModifyPerson;
