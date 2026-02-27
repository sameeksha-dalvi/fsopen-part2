import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  //console.log("Person props", props);
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
}

const Filter = (props) => {

  return (
    <div>
      Filter shown names:
      <input value={props.newFilter}
        onChange={props.onChange}
      />
    </div>
  )
}

const Persons = ({ personsToShow }) => {

  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </>
  )
}

const PersonForm = (props) => {
console.log("PersonForm ",props)
  return(<>
  <form onSubmit={props.addName}>
        <div>
          name:
          <input value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>number:
          <input value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');


  const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}

useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log("persons array", persons);
    const result = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase());
    console.log("result :", result);

    if (result.length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }


  const personsToShow = newFilter === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  //console.log("Filtered persons:", personsToShow);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
      addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App