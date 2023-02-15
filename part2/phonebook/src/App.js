import { useState, useEffect } from 'react'
import phonebookService from './services/persons.js'
import './index.css'

const Filter = ({ setFilter }) => {
  const filterChanged = (event) => setFilter(event.target.value)

  return (
    <div>
      Filter: <input onChange={filterChanged} />
    </div>
  )
}

const Form = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotificationMessage, setErrorMessage }) => {
  const nameChanged = (event) => setNewName(event.target.value)
  const numberChanged = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some((a) => a.name === personObject.name)) {
      if (window.confirm(`${newName} is already in the phonebook, would you like to update their number?`)) {
        phonebookService
        .edit(persons.filter(person => person.name === personObject.name)[0].id, personObject)
        .then(response => {
          console.log("PUT request fulfilled")
          setNotificationMessage(`Edited ${response.data.name}'s phone number to ${newNumber}`)
          setPersons(persons.map(person => person.name === response.data.name ? response.data : person))
        })
        .catch(response => {
          setErrorMessage(`Information of ${personObject.name} has already been deleted from the server`)
        })
      }
    } else {
      phonebookService
      .create(personObject)
      .then(response => {
        console.log("POST promise fulfilled")
        personObject.id = response.data.id
        setNotificationMessage(`Added ${response.data.name}`)
        setPersons(persons.concat(personObject))
      })
    }
  }

  return (
    <div>
      <form onSubmit={addPerson}>
          <div>
            name: <input onChange={nameChanged} />
          </div>
          <div>
            number: <input onChange={numberChanged}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
  )
}

const Person = ({ person, setPersons, persons, setNotificationMessage }) => {
  
  const deletePerson = (id) => {
    return () => {
      if (window.confirm(`Are you sure you would like to delete ${person.name}?`)) {
        phonebookService
        .del(id)
        .then(response => {
          console.log("DELETE request fulfilled")
          setNotificationMessage(`Deleted ${person.name}`)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    }
  }

  return (
    <tr><th>{person.name}</th><td>{person.number}</td><td><button onClick={deletePerson(person.id)}>delete</button></td></tr>
  )
}

const Table = ({ persons, setPersons, filter, setNotificationMessage }) => {
  const filteredPersons = filter === '' ? persons : persons.filter((a) => a.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <table>
        <thead><tr><th><h2>Numbers</h2></th></tr></thead>
        <tbody>
          {filteredPersons.map((person) => <Person key={person.id} person={person} persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />)}
        </tbody>
      </table>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>{message}</div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
    .get()
    .then(response => {
      console.log("GET promise fulfilled")
      setPersons(response.data)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => setNotificationMessage(null), 3000)
  }, [notificationMessage])

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 3000)
  }, [errorMessage])

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
      <Filter setFilter={setFilter} />
      <h2>Add new</h2>
      <Form newName={newName} setNewName={setNewName}
            newNumber={newNumber} setNewNumber={setNewNumber}
            persons={persons} setPersons={setPersons} 
            setNotificationMessage={setNotificationMessage} 
            setErrorMessage={setErrorMessage} />
      <Table persons={persons} setPersons={setPersons} filter={filter} setNotificationMessage={setNotificationMessage} />
    </div>
  )
}

export default App