import React from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import People from "./components/People";
import NewPerson from "./components/NewPerson";
import ModifyPerson from "./components/ModifyPerson";
import ErrorMessage from "./components/ErrorMessage";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      filterPeople: [],
      activePerson: null,
      error: ""
    };
  }

  filterPeople = text => {
    const people = this.state.people.filter(person => {
      if (text === "" || !text) {
        return person;
      } else {
        text = text.toLowerCase();
        let fname = person.firstname.toLowerCase();
        let lname = person.lastname.toLowerCase();
        return (
          fname.includes(text) ||
          lname.includes(text) ||
          text.includes(fname + " " + lname)
        );
      }
    });
    this.setState({ filterPeople: people });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3100/people")
      .then(result => {
        this.setState({ people: result.data, filterPeople: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addPerson(person) {
    axios
      .post("http://localhost:3100/people", person)
      .then(result => {
        this.setState({ people: result.data });
        this.props.history.push("/people");
      })
      .catch(error => {
        // debugger;
        // Make sure you filled everything and you don't have the name the same as someone in the Small Town.
        console.log(error);
      });
  }

  remove = id => {
    axios
      .delete(`http://localhost:3100/people/${id}`)
      .then(result => {
        this.setState({ people: result.data });
        this.props.history.push("/people");
      })
      .catch(error => {
        // Make sure you removed someone that exist in the Small Town.
        console.log(error);
      });
  };

  modify = person => {
    this.setState({ activePerson: person });
    this.props.history.push("/modify");
  };

  modifyPerson = person => {
    axios
      .put(`http://localhost:3100/people/${person.id}`, person)
      .then(result => {
        this.setState({ people: result.data });
        this.props.history.push("/people");
      })
      .catch(error => {
        // Make sure you selected someone that is still in the Small Town.
        console.log(error);
        this.setState({
          error:
            "Make sure you selected someone that is still in the Small Town."
        });
      });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/new">👤</NavLink>
          <NavLink to="/people">👪︎</NavLink>
          <NavLink to="/">🏚️</NavLink>
        </nav>
        <div>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/people"
            render={() =>
              this.state.error !== "" ? (
                <ErrorMessage message={this.state.error} />
              ) : (
                <People
                  people={this.state.filterPeople}
                  filterPeople={this.filterPeople}
                  remove={this.remove}
                  modify={this.modify}
                />
              )
            }
          />
          <Route
            exact
            path="/new"
            render={() =>
              this.state.error !== "" ? (
                <ErrorMessage message={this.state.error} />
              ) : (
                <NewPerson addPerson={this.addPerson} />
              )
            }
          />
          <Route
            exact
            path="/modify"
            render={() =>
              this.state.error !== "" ? (
                <ErrorMessage message={this.state.error} />
              ) : (
                <ModifyPerson
                  person={this.state.activePerson}
                  modifyPerson={this.modifyPerson}
                />
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
