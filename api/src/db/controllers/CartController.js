const Cart = require('../models/Cart')
const Item = require('../models/Item')

class CartController {
  constructor(userId, res) {
    this.userId = userId
    this.res = res
  }

  async getOrCreateCart() {
    try {
      let cart = await Cart.findOne({ user: this.userId })

      if (!cart) {
        cart = new Cart({ user: this.userId, items: [] })
        await cart.save()
      }

      return this.res.status(200).send(cart)
    } catch (e) {
      console.error(e)
      return this.res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  async addItem(itemId) {
    try {
      const cart = await Cart.findOne({ user: this.userId })

      if (!cart) {
        return this.res.status(400).send({ message: 'Cart not found' })
      }

      const item = await Item.findById(itemId)
      if (!item) {
        return this.res.status(404).send({ message: 'Item not found' })
      }

      if (!cart.items.include(itemId)) {
        cart.items.push(itemId)
        await cart.save()
      }

      return this.res.status(200).send(cart)
    } catch (e) {
      console.error(e)
      return this.res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  async removeItem(itemId) {
    try {
      const cart = await Cart.findOne({ user: this.userId })

      if (!cart) {
        return this.res.status(400).send({ message: 'Cart not found' })
      }

      cart.items = cart.items.filter(item => item.toString() !== itemId)
      await cart.save()

      return this.res.status(200).send(cart)
    } catch (e) {
      console.error(e)
      return this.res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  async listItems() {
    try {
      const cart = await Cart.findOne({ user: this.userId }).populate('items')

      if (!cart) {
        return this.res.status(400).send({ message: 'Cart not found' })
      }

      return this.res.status(200).send(cart.items)
    } catch (e) {
      console.error(e)
      return this.res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  async clearCart() {
    try {
      const cart = await Cart.findOne({ user: this.userId })

      if (!cart) {
        return this.res.status(400).send({ message: 'Cart not found' })
      }

      cart.items = []
      await cart.save()

      return this.res.status(200).send(cart)
    } catch (e) {
      console.error(e)
      return this.res.status(500).send({ message: 'Internal Server Error' })
    }
  }
}

module.exports = CartController
