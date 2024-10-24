const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
