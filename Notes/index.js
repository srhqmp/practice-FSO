require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')
 
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(note => {
        response.json(note)
    })   
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    console.log(body)

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.import || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})



// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })





// ////////////////////////////////////////////////////////
// // FOR PHONEBOOK
// const express = require('express')
// const app = express()

// const cors = require('cors')

// app.use(cors())

// app.use(express.json())

// app.use(express.static('build'))

// let persons = [
//     {
//       id: 1,
//       name: "sarah",
//       number: "2019-05-30",
//     },
//     {
//       id: 2,
//       name: "jane",
//       number: "2019-05-30T18:39:34.091Z",
//     },
//   ]

// app.get('/', (request, response) => {
//     response.send('<h1>Hello Phonebook!</h1>')
// })

// app.get('/api/persons', (request, response) => {
//     console.log('return persons')
//     response.json(persons)
// })


// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => {
//         // console.log(note.id, typeof note.id, id)
//         return (
//             person.id === id
//         )
//     })

//     console.log(person)

//     if (person) {
//         console.log(person)
//         response.json(person)
//     } else {
//         response.status(404).end()
//     }

// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id) 
//     persons = persons.filter(person => person.id !== id )

//     response.status(204).end()
// }) 

// const generateId = () => {
//     const maxId = persons.length > 0
//       ? Math.max(...persons.map(n => n.id))
//       : 0
//     return maxId + 1
//   }

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     console.log(body)
//     if (!body.name) {
//         return response.status(400).json({
//             error: 'missing name'
//         })
//     }

//     const person = {
//         name: body.name,
//         number: body.number,
//         id: generateId(),
//     }

//     console.log(person)
//     persons = persons.concat(person)
//     response.json(person)
// })



// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })


// //////////////////////////////////////////////////////