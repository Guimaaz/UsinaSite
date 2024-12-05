const z = require('zod')
const mongoose = require('mongoose')

const dateRegEXP = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

const parseDateString = dateString => {
  const [day, month, year] = dateString.split('/')
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0)
  )

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date format. Use DD/MM/YYYY.')
  }

  return date
}

const createEventSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  imageUrl: z.string().url({ message: 'Invalid URL format' }),
  eventDate: z
    .string()
    .refine(
      date => {
        return dateRegEXP.test(date)
      },
      { message: 'Invalid date format. Use DD/MM/YYYY.' }
    )
    .transform(dateString => {
      return parseDateString(dateString)
    }),
})


const updateEventSchema = z.object({
  name: z.string().nonempty('Name is required').optional(),
  content: z.string().nonempty('Content is required').optional(),
  imageUrl: z.string().url('Invalid URL format').optional(),
  eventDate: z.string().regex(/^\d{8}$/, 'Invalid date format (DDMMYYYY)').optional(),
});

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
  updateEventSchema
}
