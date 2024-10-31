const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
