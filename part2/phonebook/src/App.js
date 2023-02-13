import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '1234567890' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter === '' ? persons : persons.filter((a) => a.name.toLowerCase().includes(filter.toLowerCase()))

  const nameChanged = (event) => setNewName(event.target.value)
  const numberChanged = (event) => setNewNumber(event.target.value)
  const filterChanged = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some((a) => a.name === personObject.name)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter: <input onChange={filterChanged} />
      <h2>Add new</h2>
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
      <table>
        <thead><tr><th><h2>Numbers</h2></th></tr></thead>
        <tbody>
          {filteredPersons.map((person) => <tr key={person.name}><th>{person.name}</th><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App