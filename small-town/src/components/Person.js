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

	remove = (e) => {
		e.preventDefault();
		this.props.remove(this.props.person.id);
	};

	modify = (e) => {
		e.preventDefault();
		this.props.modify(this.props.person);
	};

	render() {
		return this.state.person ? (
			<div className="Person">
				<h2>
					{this.state.person.firstname} {this.state.person.lastname}
				</h2>
				<label>House: {this.state.person.house}</label>
				<label>Growth: {this.state.person.growth}</label>
				<div>
					<button className="modify" onClick={this.modify}>
						Modify person
					</button>
					<button className="remove" onClick={this.remove}>
						Remove from Small Town
					</button>
				</div>
			</div>
		) : (
			''
		);
	}
}

export default Person;
