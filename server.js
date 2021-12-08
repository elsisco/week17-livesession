import express from 'express' // Node framework to create the backend server
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import techFundings from './data/tech_fundings.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
// app.use(bodyParser.json()) // bodyParser started to deprecate some months ago
app.use(express.json())

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

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app)) // Lists all accessible endpoints
})

app.get('/users', (req, res) => {
  res.json(users)
})

// app.get('/fundings', (req, res) => {
//   res.json(techFundings)
// })

app.get('/fundings', (req, res) => {
  const { company, region } = req.query
  console.log(req.query)

  let techFundingsToSend = techFundings

  if (company) {
    techFundingsToSend = techFundingsToSend.filter(
      (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
    ) //Always use filter with query params
  }

  if (region) {
    techFundingsToSend = techFundingsToSend.filter(
      (item) => item.Region.toLowerCase().indexOf(region.toLowerCase()) !== -1
    )
  }

  res.json({
    response: techFundingsToSend,
    success: true
  })
})

// get specific company based on id, using param
app.get('/fundings/id/:id', (req, res) => {
  // :id = path params, query params?
  const { id } = req.params
  const companyId = techFundings.find((company) => company.index === +id)

  if (!companyId) {
    console.log('No company found!')
    res.status(404).send('No company found with that id.') // Send just sends a string. Great for error messages. json() compiles it to a json object.
  } else {
    res.json(companyId)
  }
})

app.get('/fundings/company/:company', (req, res) => {
  const { company } = request.params //Destructuring

  const companyByName = techFundings.find(
    (item) => item.Company.toLowerCase === company.toLowerCase
  ) //Always use find with path params

  if (!companyByName) {
    // using json() this time instead of send.
    res.status(404).json({
      response: 'No company found with that name',
      success: false
    })
  } else {
    res.status(200).json({
      response: companyByName
    })
  }
})

// Start the server (listens to the port)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`) // Confirms that this is working
})
