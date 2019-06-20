import React from "react";

import Person from "./Person";

import "./People.css";

const People = props => {
  return (
    <div className="People">
      <input
        list="people"
        placeholder="search"
        onChange={e => props.filterPeople(e.target.value)}
      />
      <datalist id="people">
        {props.people.map(person => (
          <option>
            {person.firstname} {person.lastname}
          </option>
        ))}
      </datalist>
      {props.people.map(person => (
        <Person
          key={person.id}
          person={person}
          remove={props.remove}
          modify={props.modify}
        />
      ))}
    </div>
  );
};

export default People;
