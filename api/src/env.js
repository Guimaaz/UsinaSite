const z = require('zod')

const envSchema = z.object({
  JWT_SECRET: z.string(),
  MONGO_URL: z.string()
})

const env = envSchema.parse(process.env)

module.exports = env
