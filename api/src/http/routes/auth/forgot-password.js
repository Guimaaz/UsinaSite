const crypto = require('node:crypto')
const nodemailer = require('nodemailer')

const UserController = require('../../../db/controllers/UserController')
const { updatePasswordSchema } = require('../../../utils/schemas/userSchemas')
const env = require('../../../utils/env')

async function updateUserPassword(app) {
  app.post('/auth/update-password', async (req, res) => {
    const informations = updatePasswordSchema.safeParse(req.body)

    if (!informations.success || !informations.data) {
      return res.status(400).send({
        error: 'The update password informations are incomplete or invalid',
      })
    }

    const { email } = informations.data

    const newPassword = crypto.randomBytes(8).toString('hex')

    const userController = new UserController(null, email, null, res)
    await userController.updatePassword(newPassword)

    const transporter = nodemailer.createTransport({
      host: env.BREVO_HOST,
      port: Number(env.BREVO_PORT),
      auth: {
        user: env.BREVO_USER,
        pass: env.BREVO_PASS,
      },
    })

    const mailOptions = {
      from: env.BREVO_SENDER,
      to: email,
      subject: 'Sua nova senha - Usina Eco-Cultural',
      text: `Olá! Sua nova senha de acesso ao sistema da Usina Eco-Cultural é ${newPassword}. Use-a para acessar sua conta`,
    }

    try {
      transporter
        .sendMail(mailOptions)
        .then(x => console.log(x))
        .catch(e => console.log(e))
      return res
        .status(200)
        .send({ message: 'Nova senha enviada ao e-mail do usuário.' })
    } catch (e) {
      return res
        .status(500)
        .send({ message: 'Erro ao enviar o e-mail de recuperação de senha.' })
    }
  })
}

module.exports = updateUserPassword
