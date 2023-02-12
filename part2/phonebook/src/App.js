import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const nameChanged = (event) => setNewName(event.target.value)

const addName = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName
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
      <form onSubmit={addName}>
        <div>
          name: <input onChange={nameChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <table>
        <thead><tr><th><h2>Numbers</h2></th></tr></thead>
        <tbody>
          {persons.map((person) => <tr key={person.name}><th>{person.name}</th></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App