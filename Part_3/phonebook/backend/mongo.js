const mongoose = require('mongoose')

const password = ''

// Check if password is provided
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://andrescq95:${password}@phonebook.7wcjnwt.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

// Check password
if ((process.argv[2]) === password) {
  // List all contacts
  if (process.argv.length === 3){
    console.log('Phonebook:')
    Contact.find({}).then(result => {
      result.forEach(contact => {
      console.log(contact.name, contact.number)
      })
      mongoose.connection.close()
    }).catch(error => {
      console.error("Error fetching contacts:", error)
      mongoose.connection.close()
    })
  }
  // Add a new contact
  else if (process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4]

    const contact = new Contact({
      name: name,
      number: number
    })

    contact.save().then(result => {
      console.log('Added ',contact.name,' number ',contact.number, 'to phonebook')
      mongoose.connection.close()
    }).catch(error => {
      console.error("Error saving contact:", error)
      mongoose.connection.close()
    })
  }
  // Too many arguments
  else if (process.argv.length > 5){
    console.log('Too many arguments. If the Contact Name contains whitespaces, it must be enclosed in quotes.')
    process.exit(1)
  }
  // Too many arguments
  else if (process.argv.length === 4){
    console.log('Missing one argument to add a contact. Please provide both Name and Number.')
    process.exit(1)
  }
}
// Invalid password
else {
    console.log("Invalid password")
    process.exit(1)
}
