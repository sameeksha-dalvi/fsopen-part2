import { useState } from 'react'

const Person = (props) => {
  //console.log("Person props", props);
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
      <div>
          Filter shown names:
          <input value={newFilter}
            onChange={handleFilterChange}
          />
        </div>
        <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:
          <input value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App