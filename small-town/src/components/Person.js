import React from 'react';

class Person extends React.Component {
	constructor() {
		super();
		this.state = {
			person: null
		};
	}

	componentDidMount() {
		this.setState({ person: this.props.person });
	}

	render() {
		return this.state.person ? (
			<div className="Person">
				<h2>
					{this.state.person.firstname} {this.state.person.lastname}
				</h2>
				<label>Home: {this.state.person.house}</label>
				<label>Growth: {this.state.person.growth}</label>
			</div>
		) : (
			''
		);
	}
}

export default Person;
