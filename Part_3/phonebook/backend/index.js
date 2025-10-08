require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const Contact = require('./models/contact')

let contacts = []

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body) || null;
});

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
    Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

//Get a single contact by ID
app.get('/api/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  })
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
  const contact = new Contact({
    id: generateId(),
    name: body.name,
    number: body.number
  })
  contact.save().then(savedContact => {
    response.json(savedContact)
  })
})

//Delete a contact by ID
app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})