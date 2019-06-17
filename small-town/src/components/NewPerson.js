import React from 'react';

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

	render() {
		return (
			<form>
				<div>
					<label>First name:</label>
					<input type="text" placeholder="fill" />
				</div>
				<div>
					<label>Last name:</label>
					<input type="text" placeholder="fill" />
				</div>
				<div>
					<label>House:</label>
					<input type="number" placeholder="fill the house number" />
				</div>
				<div>
					<label>Growth:</label>
					<select>
						<option>kid</option>
						<option>teenager</option>
						<option>adult</option>
						<option>old</option>
					</select>
				</div>
			</form>
		);
	}
}

export default NewPerson;
