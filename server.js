import express from 'express' // Node framework to create the backend server
import bodyParser from 'body-parser'
import cors from 'cors'
import techFundings from './data/tech_fundings.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const users = [
  { id: 1, name: 'Alice', age: 33 },
  { id: 2, name: 'Bob', age: 10 },
  { id: 3, name: 'Daniela', age: 63 }
]

// Start defining your routes here
// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// This is our first endpoint
app.get('/', (req, res) => {
  res.send('Hello browser!')
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/fundings', (req, res) => {
  res.json(techFundings)
})

// get specific company based on id, using param
app.get('/fundings/:index', (req, res) => {
  const { index } = req.params
  const companyIndex = techFundings.find((company) => company.index === +index)

  if (!companyIndex) {
    console.log('No company found!')
    res.status(404).send('No company found with that index.') // Send just sends a string. Great for error messages.
  } else {
    res.json(companyIndex)
  }
})

// Start the server (listens to the port)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`) // Confirms that this is working
})
