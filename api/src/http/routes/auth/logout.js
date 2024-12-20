const authenticate = require('../../../middlewares/authenticate')

async function logout(app) {
  app.post('/auth/logout', { preHandler: authenticate }, async (req, res) => {
    res.clearCookie('token')

    return res.send({ message: 'Logged out successfully' })
  })
}

module.exports = logout
