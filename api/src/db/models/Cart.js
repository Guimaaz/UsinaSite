const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
