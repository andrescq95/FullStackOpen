import { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import Form from './components/Form'
import Footer from './components/Footer'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [alertType, setAlertType] = useState(false) // true for success, false for error

  const normalizeName = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  //Filter contacts based on filterName state. If filterName is empty, show all contacts.
  const contactsToShow = (!filterName.trim())
  ? contacts
  : contacts.filter(person =>
      normalizeName(person.name).includes(normalizeName(filterName)))

  const addContact = (event) => {
    event.preventDefault()
    //Prevent empty values
    if (!newName.trim() || !newNumber.trim()) {
      setNotificationMessage(
          `Name or Number cannot be empty'`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)
        setAlertType(false)
      return
    }
    //If the name is the same
    else if (contacts.some(contact =>
      (normalizeName(contact.name) === normalizeName(newName)))) {
        //Ask if the user wants to update the contact number
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          //Search for the contact to update
          const updatedContact = contacts.find(contact =>
            normalizeName(contact.name) === normalizeName(newName))
          //Update the number and call the update function
          updatedContact.number = newNumber
          //handleNumberUpdate(updatedContact)
          setNewName('')
          setNewNumber('')
          return
        }
        //If the user doesn't want to update, clear the input fields
        else {
            setNewName('')
            setNewNumber('')
            return
        }
    }
    //Create a new contact object
    const contactObject = {
      name: newName,
      number: newNumber,
      id: (contacts.length + 1).toString()
    }
    //Post the new contact to the server
    contactService
      .createContact(contactObject)
      .then(returnedContact => {
        setContacts(contacts.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Added ${contactObject.name} to the phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)
        setAlertType(true)
      })
  }

  const handleDeleteContact = id => {
    const contact = contacts.find(n => n.id === id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setNotificationMessage(
            `Successfully deleted ${contact.name} from the phonebook`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
          setAlertType(true)
          setContacts(contacts.filter(contact => contact.id !== id))
        })
        .catch(error => {
          setNotificationMessage(
          `Error deleting the contact ${contact.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
          setAlertType(false)
          setContacts(contacts.filter(n => n.id !== id))
        })
    }
  }

  const handleNumberUpdate = updatedContact => {
    contactService
    .updateContact(updatedContact.id, updatedContact).then(returnedContact => {
      setNotificationMessage(
        `Successfully updated ${updatedContact.name} from the phonebook`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
      setAlertType(true)
      setContacts(contacts.map(contact => contact.id === updatedContact.id ? returnedContact : contact))
    })
    .catch(error => {
      setNotificationMessage(
        `Error updating the contact ${updatedContact.name}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000)
      setAlertType(false)
      setContacts(contacts.filter(n => n.id !== updatedContact.id))
    })
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
      <Notification message={notificationMessage} alertType = {alertType}/>
      <Filter onChange = {handleFilterNameChange} value = {filterName} />
      <h3>Add new contact</h3>
      <Form addContact = {addContact} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {contactsToShow.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            handleDeleteContact={() => handleDeleteContact(contact.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App