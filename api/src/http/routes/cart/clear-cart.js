const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function clearCart(app) {
  app.delete('/cart/clear', authenticate, async (req, res) => {
    const userId = req.user.id

    const cartController = new CartController(userId, res)

    await cartController.clearCart()
  })
}

module.exports = clearCart
