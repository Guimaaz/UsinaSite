const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function getOrCreateCart(app) {
  app.post('/cart', { preHandler: authenticate }, async (req, res) => {
    const userId = req.user.id
    const cartController = new CartController(userId, res)

    await cartController.getOrCreateCart()
  })
}

module.exports = getOrCreateCart
