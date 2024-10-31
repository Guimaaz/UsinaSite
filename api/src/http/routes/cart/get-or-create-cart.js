const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function getOrCreateCart(app) {
  app.post('/cart', authenticate, async (req, res) => {
    const userId = req.user.id
    const cartController = new CartController(userId, res)

    try {
      const cart = await cartController.getOrCreateCart()
      return res.status(200).send(cart)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: 'Internal server error' })
    }
  })
}

module.exports = getOrCreateCart
