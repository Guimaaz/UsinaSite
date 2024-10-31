const UserController = require('../../../db/controllers/UserController')
const { signUpSchema } = require('../../../utils/schemas/userSchemas')

async function signUp(app) {
  app.post('/auth/signup', async (req, res) => {
    try {
      const signUpInformations = signUpSchema.safeParse(req.body)

      if (!signUpInformations.success || !signUpInformations.data) {
        return res.status(400).send({
          error: 'The sign up informations are incomplete or invalid',
        })
      }

      const userController = new UserController(
        signUpInformations.data.username,
        signUpInformations.data.email,
        signUpInformations.data.password,
        res
      )

      const userExists = await userController.validateIfExists(false)

      if (userExists) {
        console.log(userExists)

        return res
          .status(400)
          .send({
            message: `User "${signUpInformations.data.username}" already exists`,
          })
      }

      userController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = signUp
