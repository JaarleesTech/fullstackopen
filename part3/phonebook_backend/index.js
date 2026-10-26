const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('post-data', (request) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
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
    },
    {
        "id": "5",
        "name": "Mohamed",
        "number": "0907609135"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p> ${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person)  {
        response.json(person)
    } else{
        response.status(404).send('Person not found')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(!person) {
        return response.status(404).send('Person not found')
    } 

    persons = persons.filter(person => person.id !== id)

    response.status(204).end() 
})

const generateId = () => {
    const maxId =
        persons.length > 0 ? Math.max(...persons.map(person => Number(person.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body ?? {}

    if(
        typeof body.name !== 'string' ||
        typeof body.number !== 'string' ||
        !body.name.trim() ||
        !body.number.trim()
    ) {
        return response.status(400).send('Error: name and number must be non-empty strings')
    } 

    const name = body.name.trim()
    const number = body.number.trim()

    const duplicatePerson = persons.find(
        person => person.name.toLowerCase() === name.toLowerCase())

    if(duplicatePerson) {
        return response.status(400).send('Error: name already exists')
    }

    const person = {
        id: generateId(),
        name,
        number
    }

    persons = persons.concat(person)

    response.status(201).json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})