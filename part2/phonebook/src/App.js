import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ setFilter }) => {
  const filterChanged = (event) => setFilter(event.target.value)

  return (
    <div>
      Filter: <input onChange={filterChanged} />
    </div>
  )
}

const Form = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
  const nameChanged = (event) => setNewName(event.target.value)
  const numberChanged = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some((a) => a.name === personObject.name)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        console.log("POST promise fulfilled")
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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

const Person = ({ person }) => <tr><th>{person.name}</th><td>{person.number}</td></tr>

const Table = ({ persons, filter }) => {
  const filteredPersons = filter === '' ? persons : persons.filter((a) => a.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <table>
        <thead><tr><th><h2>Numbers</h2></th></tr></thead>
        <tbody>
          {filteredPersons.map((person) => <Person key={person.id} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log("GET promise fulfilled")
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add new</h2>
      <Form newName={newName} setNewName={setNewName}
            newNumber={newNumber} setNewNumber={setNewNumber}
            persons={persons} setPersons={setPersons} />
      <Table persons={persons} filter={filter} />
    </div>
  )
}

export default App