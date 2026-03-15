import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Person = ({ name, number, deleteContact }) => {
  //console.log("Person props", props);
  return (
    <>
      <p>{name} {number}</p>
      <button onClick={deleteContact}>delete</button>
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

const Persons = ({ personsToShow, deleteContactOf }) => {

  return (
    <>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deleteContact={() => deleteContactOf(person.id)}
        />
      )}
    </>
  )
}

const PersonForm = (props) => {
  //console.log("PersonForm ", props)
  return (<>
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
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {

    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    //console.log("persons array", persons);
    const result = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase());
    //console.log("result :", result[0].id);

    const personObject = {
      name: newName,
      number: newNumber
    }
    //console.log("personObject ",personObject)
    if (result.length > 0) {
      const id = result[0].id;
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .updateContact(id, personObject)
          .then(returnedContact => {
            setPersons(persons.map(person => person.id === id ? returnedContact : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${personObject.name} has already been removed from the server`
            )
            setNotificationType('error')
            setTimeout(() => {
              setErrorMessage(null)
              setNotificationType(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }

      return;
    }



    personService
      .createContact(personObject)
      .then(returnContact => {

        setErrorMessage(
          `Added ${returnContact.name}`
        )
        setNotificationType('success')
        setTimeout(() => {
          setErrorMessage(null)
          setNotificationType(null)
        }, 5000)

        setPersons(persons.concat(returnContact))
        setNewName('')
        setNewNumber('')
      }).catch(error => {

        setErrorMessage(error.response.data.error)
        setNotificationType('error')
        setTimeout(() => {
          setErrorMessage(null)
          setNotificationType(null)
        }, 5000)
        console.log(error.response.data.error)
      })


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

  const deleteContactOf = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteContact(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={notificationType} />
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
      <Persons personsToShow={personsToShow} deleteContactOf={deleteContactOf} />
    </div>
  )
}

export default App