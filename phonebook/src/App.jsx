import { useState } from 'react'

const Person = (props) => {
  console.log("Person props", props);
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456789' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App