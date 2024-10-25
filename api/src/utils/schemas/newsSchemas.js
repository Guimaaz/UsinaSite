const z = require('zod')
const mongoose = require('mongoose')

const createNewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().url(),
})

const deleteNewsByIdSchema = z.object({
  id: z.string().refine(v => mongoose.Types.ObjectId.isValid(v), {
    message: 'Invalid id format',
  }),
})

const getNewsByIdSchema = z.object({
  id: z.string().refine(v => mongoose.Types.ObjectId.isValid(v), {
    message: 'Invalid id format',
  }),
})

module.exports = {
  createNewsSchema,
  deleteNewsByIdSchema,
  getNewsByIdSchema,
}
