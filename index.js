const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-53232532",
    },
    {
      id: 3,
      content: "Dan Abramov",
      date: "12-34-567890",
    },
    {
        id: 4,
        content: "Mary Poppendick",
        date: "39-23-123456",
      }
  ]

  app.use(express.json())
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length +
     ' people</p>' + new Date().toString())
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
    })
    }
    if (persons.filter(person => person.name === body.name)
    .length > 0) {
      return response.status(400).json({ 
        error: 'name must be unique' 
    })
    }

    const generateId = () => {
        const id = getRandomInt(1,1000)
        return id
      }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
  }) 

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })