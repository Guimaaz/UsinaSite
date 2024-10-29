const z = require('zod')

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

const updatePasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'),
})

module.exports = { loginSchema, signUpSchema, updatePasswordSchema }
