import React from 'react';

import Person from './Person';

const People = (props) => {
	return <div className="People">{props.people.map((person) => <Person person={person} />)}</div>;
};

export default People;
