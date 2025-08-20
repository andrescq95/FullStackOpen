import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    //Prevent empty name
    if (!newName.trim()) {
      return alert('Name cannot be empty')
    }
    //Prevent the user from being able to add names that already exist in the phonebook
    if (persons.some(person =>
      normalizeName(person.name) === normalizeName(newName))) {
        setNewName('')
        return alert(`${newName} is already added to phonebook`)
    }
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const normalizeName = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Name key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

const Name = ({ person }) => {
  return <>{person.name}<br/></>
}

export default App