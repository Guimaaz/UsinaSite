const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = require('../../../db/controllers/UserController')
const env = require('../../../utils/env')
const { loginSchema } = require('../../../utils/schemas/userSchemas')

async function login(app) {
  app.post('/auth/login', async (req, res) => {
    const loginInformations = loginSchema.safeParse(req.body)

    if (!loginInformations.success || !loginInformations.data) {
      return res.status(400).send({
        error: 'The login informations are incomplete or invalid',
      })
    }

    const userController = new UserController(
      loginInformations.data.username,
      undefined,
      loginInformations.data.password,
      res
    )

    try {
      const user = await userController.validateIfExists(true)

      if (!user) {
        return res.status(400).send({ message: 'User not found' })
      }

      const passwordIsValid = bcrypt.compareSync(
        loginInformations.data.password,
        user[0].passwordHash
      )
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' })
      }

      const token = jwt.sign({ id: user[0]._id }, env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
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
