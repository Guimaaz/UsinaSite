const User = require('../../../db/models/User')
const authenticate = require('../../../middlewares/authenticate')

async function me(app) {
  app.get('/auth/me', { preHandler: authenticate }, async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) return res.status(404).send({ message: 'User not found' })

    res.status(200).send({
      user: {
        id: req.user.id,
        email: req.user.email,
        username: user.username,
        type: req.user.isAdmin ? 'ADMIN' : 'USER',
      },
    })
  })
}

module.exports = me
