const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  eventDate: {
    type: Date,
  },
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
