const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()
const vehicleRoute = require('./routes/vehicles')
const customersRoute = require('./routes/customers')
const PORT = 5000

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', vehicleRoute)
app.use('/', customersRoute)

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server running on port: ${PORT}`)
})
