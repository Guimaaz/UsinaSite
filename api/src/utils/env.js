require('dotenv').config()

const z = require('zod')

const envSchema = z.object({
  JWT_SECRET: z.string(),
  MONGO_URL: z.string(),
  BREVO_USER: z.string(),
  BREVO_PASS: z.string(),
  BREVO_HOST: z.string(),
  BREVO_SENDER: z.string(),
  BREVO_PORT: z.string(),
})

const env = envSchema.parse(process.env)

module.exports = env
