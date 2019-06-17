const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3100;

const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
	res.status(422);
	res.json({ Error: msg });
	return;
};

let people = [
	{
		id: 1,
		firstname: 'John',
		lastname: 'Smith',
		house: 1,
		growth: 'adult'
	},
	{
		id: 2,
		firstname: 'Lily',
		lastname: 'Smith',
		house: 1,
		growth: 'adult'
	},
	{
		id: 3,
		firstname: 'Mary',
		lastname: 'Smith',
		house: 1,
		growth: 'kid'
	},
	{
		id: 4,
		firstname: 'Tom',
		lastname: 'Smith',
		house: 1,
		growth: 'kid'
	},
	{
		id: 5,
		firstname: 'Muriel',
		lastname: 'Bagge',
		house: 2,
		growth: 'adult'
	},
	{
		id: 6,
		firstname: 'Eustace',
		lastname: 'Bagge',
		house: 2,
		growth: 'adult'
	},
	{
		id: 7,
		firstname: 'King',
		lastname: 'Ramses',
		house: 2,
		growth: 'kid'
	}
];
server.get('/people', (req, res) => {
	res.json(people);
});
let personId = 1;

server.post('/people', (req, res) => {
	const { firstname, lastname, house, growth } = req.body;
	const newPerson = { firstname, lastname, house, growth, id: personId };
	if (!firstname || !lastname || !house || !growth) {
		return sendUserError(
			'What neighbour! Firstname/Lastname/House/Growth are all required to create a person in the Small Town.',
			res
		);
	}
	const findPersonByName = (person) => {
		return person.firstname === firstname && person.lastname === lastname;
	};
	if (people.find(findPersonByName)) {
		return sendUserError(`What neighbour! ${firstname} ${lastname} already exists in the Small Town.`, res);
	}

	people.push(newPerson);
	personId++;
	res.json(people);
});

server.put('/people/:id', (req, res) => {
	const { id } = req.params;
	const { firstname, lastname, house, growth } = req.body;
	const findSmurfById = (person) => {
		return person.id == id;
	};
	const foundPerson = people.find(findSmurfById);
	if (!foundPerson) {
		return sendUserError('No person found by that ID', res);
	} else {
		if (firstname) foundPerson.firstname = firstname;
		if (lastname) foundPerson.lastname = lastname;
		if (house) foundPerson.house = house;
		if (growth) foundPerson.growth = growth;
		res.json(people);
	}
});

server.delete('/people/:id', (req, res) => {
	const { id } = req.params;
	const foundPerson = people.find((person) => person.id == id);

	if (foundPerson) {
		const PersonRemoved = { ...foundPerson };
		people = people.filter((person) => person.id != id);
		res.status(200).json(people);
	} else {
		sendUserError('No person by that ID exists in the Small Town.', res);
	}
});

server.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`server is listening on port ${port}`);
});
