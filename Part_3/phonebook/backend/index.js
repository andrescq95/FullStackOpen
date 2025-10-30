require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const Contact = require('./models/contact')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


morgan.token('body', (req, res) => {
  return JSON.stringify(req.body) || null;
});

//Info page
app.get('/info', (request, response, next) => {
  const date = new Date()
  Contact.countDocuments({})
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
    .catch(error => next(error))
})

//Get all contacts
app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

//Get a single contact by ID
app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
  .then(contact => {
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
  }).catch(error => next(error))
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
app.post('/api/contacts', (request, response, next) => {
  const body = request.body

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
  .catch(error => next(error))
})

//Delete a contact by ID
app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      number: request.body.number
    },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
  .then(updatedContact => {
    if (!updatedContact) {
      return response.status(404).json({
        error: 'Contact not found'
      });
    }
    response.json(updatedContact);
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})