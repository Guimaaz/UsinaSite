const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function removeItem(app) {
  app.delete('/cart/remove', { preHandler: authenticate }, async (req, res) => {
    const userId = req.user.id
    const { itemId } = req.body

    const cartController = new CartController(userId, res)

    await cartController.removeItem(itemId)
  })
}

module.exports = removeItem
