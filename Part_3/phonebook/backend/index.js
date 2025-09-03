const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let contacts = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

//Main page
app.get('/', (request, response) => {
  response.send('<h1>Phonebook Main Page</h1>')
})

//Info page
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${date}</p>`)
})

//Get all contacts
app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

//Get a single contact by ID
app.get('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

//Random ID generator
const generateId = () => {
  return String(Math.floor(Math.random() * (1000 - 5) + 5))
}

// Normalize name by trimming spaces and converting to lowercase
const normalizeName = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ')
}

//Add a new contact
app.post('/api/contacts', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or Number are missing'
    })
  }
  else if (contacts.find(contact => (normalizeName(contact.name) === normalizeName(body.name)))) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }
  const contact = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  contacts = contacts.concat(contact)

  response.json(contact)
})

//Delete a contact by ID
app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})