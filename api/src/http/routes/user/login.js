const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = require('../../../db/controllers/UserController')
const env = require('../../../env')

async function login(app) {
  app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    const userController = new UserController(
      username,
      undefined,
      password,
      res
    )

    try {
      const user = await userController.validateIfExists(true)

      if (!user) {
        return res.status(400).send({ message: 'User not found' })
      }

      const passwordIsValid = bcrypt.compareSync(password, user[0].passwordHash)
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' })
      }

      const token = jwt.sign({ id: user[0]._id }, env.JWT_SECRET, {
        expiresIn: 86400,
      })

      console.log('Login successful, token generated:', token)

      return res.status(200).send({
        message: 'Login successful',
        token: token,
      })
    } catch (err) {
      console.error('Error during login:', err)
      return res.status(500).send({ message: 'Internal server error' })
    }
  })
}

module.exports = login
