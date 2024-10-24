const bcrypt = require('bcryptjs')

const validadeIfUserExists = require('../../../utils/auth/validade-if-user-exists')
const createUser = require('../../../utils/auth/create-user')

async function signUp(app) {
  app.post('/auth/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body

      if (!username || !email || !password) {
        return res.status(400).send({ message: 'Invalid username or password' })
      }

      const hashedPassword = bcrypt.hashSync(password, 8)

      // Verifica se o usuário já existe
      const userExists = await validadeIfUserExists(username, email)

      if (userExists) {
        console.log(userExists)

        return res
          .status(400)
          .send({ message: `User "${username}" already exists` })
      }

      createUser({ username, email, password, hashedPassword, res })
    } catch (err) {
      throw new Error('Error creating user', err)
    }
  })
}

module.exports = signUp
