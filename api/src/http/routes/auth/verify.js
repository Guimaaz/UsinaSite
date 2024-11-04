const authenticate = require('../../../middlewares/authenticate')

async function verify(app) {
  app.get('/auth/verify', { preHandler: authenticate }, async (req, res) => {
    res.status(200).send({ loggedIn: true })
  })
}

module.exports = verify
