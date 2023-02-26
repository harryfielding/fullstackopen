const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://fieldbox:${password}@phonebook.2vkjayg.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 4) {
    console.log("Not enough arguments")
    process.exit(1)
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

