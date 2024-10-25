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

module.exports = { loginSchema, signUpSchema }
