import React from 'react';

import Person from './Person';

import './People.css';

const People = (props) => {
	return <div className="People">{props.people.map((person) => <Person key={person.id} person={person} />)}</div>;
};

export default People;
