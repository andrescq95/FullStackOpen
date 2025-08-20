import { useState } from 'react'
import Contact from './components/Contact'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    //Prevent empty name
    if (!newName.trim()) {
      return alert('Name cannot be empty')
    }
    //Prevent the user from being able to add names that already exist in the phonebook
    if (persons.some(person =>
      normalizeName(person.name) === normalizeName(newName))) {
        setNewName('')
        setNewNumber('')
        return alert(`${newName} is already added to phonebook`)
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const normalizeName = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add new contact</h2>
      <form onSubmit={addPerson}>
        <div>Name:   <input value={newName} onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">Add</button></div>
      </form>
      <h2>Numbers</h2>
      <>
        <Contact persons={persons} />
      </>
    </div>
  )
}
export default App