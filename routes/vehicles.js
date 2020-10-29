const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb').MongoClient
const vehicleRoute = express.Router()
const url2 =
  'mongodb+srv://user:user@cluster0.ec0yt.gcp.mongodb.net/rent-a-car?retryWrites=true&w=majority'

const user1 = new MongoClient(url2, { useUnifiedTopology: true })

vehicleRoute.use(express.json())

vehicleRoute.get('/vehicles', (req, res) => {
  mongodb.connect(url2, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err
    let carDB = db.db('rent-a-car')
    carDB
      .collection('vehicles')
      .find()
      .toArray((err, data) => {
        if (err) throw err
        res.json(data)
      })
  })
})

vehicleRoute.post('/vehicles', (req, res) => {
  mongodb.connect(url2, (err, db) => {
    if (err) throw err
    db.db('rent-a-car')
      .collection('vehicles')
      .insertOne(req.body)
  })
})

vehicleRoute.put('/vehicles', (req, res) => {
  let updatedObject = req.body[0]
  console.log(updatedObject)
  user1.connect(err => {
    if (err) throw err
    user1
      .db('rent-a-car')
      .collection('vehicles')
      .deleteOne({ _id: ObjectId(`${updatedObject._id}`) })

    user1
      .db('rent-a-car')
      .collection('vehicles')
      .insertOne({
        vehicleType: updatedObject.vehicleType,
        brand: updatedObject.brand,
        model: updatedObject.model,
        year: updatedObject.year,
        vehicleFuel: updatedObject.vehicleFuel,
        numberOfSeats: updatedObject.numberOfSeats,
        price: updatedObject.price,
        countVehicles: updatedObject.countVehicles
      })
  })
})

vehicleRoute.delete('/vehicles/:item', (req, res) => {
  console.log(req.body)
  mongodb.connect(url2, (err, db) => {
    if (err) throw err
    db.db('rent-a-car')
      .collection('vehicles')
      .deleteOne(
        {
          model: JSON.parse(req.params.item).model
        },
        (err, data) => {
          if (err) throw err
          res.json(data)
        }
      )
  })
})

module.exports = vehicleRoute
