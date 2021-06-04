const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    console.log('To add a number to phonebook: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb://sarah:${password}@clusters-shard-00-00.zetrn.mongodb.net:27017,clusters-shard-00-01.zetrn.mongodb.net:27017,clusters-shard-00-02.zetrn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4i5z05-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("Database connected!~"))
    .catch(err => console.log(err));

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
    console.log(`phonebook:`)
    Phonebook.find({}).then(person => {
        person.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    }).catch(error => console.log(error))
} else {
    const contact = new Phonebook({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`Added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
    }).catch(error => {
        console.log('error:', error)
    })
}

