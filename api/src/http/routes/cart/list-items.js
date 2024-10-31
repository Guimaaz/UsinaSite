const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function listItems(app) {
  app.get('/cart/items', { preHandler: authenticate }, async (req, res) => {
    const userId = req.user.id

    const cartController = new CartController(userId, res)

    await cartController.listItems()
  })
}

module.exports = listItems
