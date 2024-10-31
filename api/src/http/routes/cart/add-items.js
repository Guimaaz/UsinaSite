const CartController = require('../../../db/controllers/CartController')
const authenticate = require('../../../middlewares/authenticate')

async function addItems(app) {
  app.post('/cart/add', authenticate, async (req, res) => {
    const userId = req.user.id
    const { itemId, quantity } = req.body

    const cartController = new CartController(userId, res)

    await cartController.addItem(itemId, quantity)
  })
}

module.exports = addItems
