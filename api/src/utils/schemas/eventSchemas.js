const z = require('zod')

const createEventSchema = z.object({
  name: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  eventDate: z.date(),
})

const deleteEventByIdSchema = z.object({
  id: z.string().refine(v => mongoose.Types.ObjectId.isValid(v), {
    message: 'Invalid id format',
  }),
})

const getEventByIdSchema = z.object({
  id: z.string().refine(v => mongoose.Types.ObjectId.isValid(v), {
    message: 'Invalid id format',
  }),
})

module.exports = {
  createEventSchema,
  deleteEventByIdSchema,
  getEventByIdSchema,
}
