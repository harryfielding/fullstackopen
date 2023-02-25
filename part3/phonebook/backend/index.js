const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Name missing"
    })
  }

  if (!req.body.number) {
    return res.status(400).json({
      error: "Number missing"
    })
  }

  if (phonebook.find(person => person.name === req.body.name)) {
    return res.status(400).json({
      error: "Name already taken"
    })
  }

  const person = {
    id: Math.round(Math.random() * 1000000000),
    name: req.body.name,
    number: req.body.number
  }

  phonebook = phonebook.concat(person)
  res.send(person)
})

app.get('/info', (req, res) => {
  let date = new Date()  
  res.send(`<p>Phonebook has info for ${phonebook.length} people.</p>
            <p>Time: ${date.toUTCString()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})