const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb').MongoClient
const customersRoute = express.Router()

const url =
  'mongodb+srv://user:user@cluster0.ec0yt.gcp.mongodb.net/rent-a-car?retryWrites=true&w=majority'

const user = new MongoClient(url, { useUnifiedTopology: true })

customersRoute.get('/customers', (req, res) => {
  user.connect(err => {
    if (err) throw err
    user
      .db('rent-a-car')
      .collection('customers')
      .find()
      .toArray((err, data) => {
        if (err) throw err
        res.json(data)
      })
  })
})

customersRoute.post('/customers', (req, res) => {
  const customer = { ...req.body, rentals: [] }
  user.connect(err => {
    if (err) throw err
    user
      .db('rent-a-car')
      .collection('customers')
      .insertOne(customer)
  })
})

customersRoute.put('/customers', (req, res) => {
  let updatedObject = req.body[0]

  console.log(updatedObject)
  user.connect(err => {
    if (err) throw err
    user
      .db('rent-a-car')
      .collection('customers')
      .deleteOne({ _id: ObjectId(`${req.body[0]._id}`) })
    user
      .db('rent-a-car')
      .collection('customers')
      .insertOne({
        fullName: req.body[0].fullName,
        email: req.body[0].email,
        phone: req.body[0].phone,
        rentals: req.body[0].rentals
      })
  })
})

customersRoute.delete('/customers/:name', (req, res) => {
  user.connect(err => {
    if (err) throw err
    user
      .db('rent-a-car')
      .collection('customers')
      .deleteOne(
        {
          fullName: JSON.parse(req.params.name).fullName,
          email: JSON.parse(req.params.name).email,
          phone: JSON.parse(req.params.name).phone
        },
        (err, data) => {
          if (err) throw err
          res.json(data)
        }
      )
  })
})

module.exports = customersRoute
