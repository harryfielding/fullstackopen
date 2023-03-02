require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', req => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body)
	}
	return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.json(persons)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const person = new Person({
		name: req.body.name,
		number: req.body.number
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.get('/info', (req, res, next) => {
	Person.find({})
		.then(persons => {
			let date = new Date()
			res.send(`<p>Phonebook has info for ${persons.length} people.</p>
      <p>Time: ${date.toUTCString()}</p>`)
		})
		.catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json(error)
	}

	next(error)
}

app.use(errorHandler)