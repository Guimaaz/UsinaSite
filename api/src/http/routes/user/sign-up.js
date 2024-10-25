const UserController = require('../../../db/controllers/UserController')

async function signUp(app) {
  app.post('/auth/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body

      if (!username || !email || !password) {
        return res.status(400).send({ message: 'Invalid username or password' })
      }

      const userController = new UserController(username, email, password, res)

      const userExists = await userController.validateIfExists(false)

      if (userExists) {
        console.log(userExists)

        return res
          .status(400)
          .send({ message: `User "${username}" already exists` })
      }

      userController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = signUp
