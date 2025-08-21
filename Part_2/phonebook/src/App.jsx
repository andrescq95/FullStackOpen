import { useState } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  //Filter contacts based on filterName state. If filterName is empty, show all contacts.
  const contactsToShow = (!filterName.trim())
  ? persons
  : persons.filter(person =>
      normalizeName(person.name).includes(normalizeName(filterName)))

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
      number: newNumber,
      id: (persons.length + 1),
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

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange = {handleFilterNameChange} value = {filterName} />
      <h3>Add new contact</h3>
      <Form addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h3>Numbers</h3>
      <Contact persons = {contactsToShow} />
    </div>
  )
}

export default App