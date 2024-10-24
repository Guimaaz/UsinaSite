const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validadeIfUserExists = require('../../../utils/auth/validade-if-user-exists')
// const env = require('../../../env')

async function login(app) {
  app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    try {
      // // Verifica se o usuário existe
      const user = await validadeIfUserExists(username, password, true)

      if (!user) {
        return res.status(400).send({ message: 'User not found' })
      }
      // Verifica se a senha está correta
      const passwordIsValid = bcrypt.compareSync(password, user[0].passwordHash)
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' })
      }

      // Gera um token JWT
      const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // Token expira em 24 horas
      })

      console.log('Login successful, token generated:', token) // Verificação do token no log

      // Envia a resposta com o token
      return res.status(200).send({
        message: 'Login successful',
        token: token,
      })
    } catch (err) {
      console.error('Error during login:', err) // Loga qualquer erro durante o processo
      return res.status(500).send({ message: 'Internal server error' })
    }
  })
}

module.exports = login
