const EventController = require('../../../db/controllers/EventController')
const { deleteEventByIdSchema } = require('../../../utils/schemas/eventSchemas')

async function deleteEventByIdRoute(app) {
  app.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params
      console.log(id)

      const eventInformations = deleteEventByIdSchema.safeParse(req.params)

      if (!eventInformations.success || !eventInformations.data) {
        return res.status(400).send({
          error: 'The event informations are incomplete or invalid',
        })
      }

      const eventController = new EventController(
        id,
        ...Array(4),
        res
      )

      await eventController.delete()
    } catch (err) {
      console.log(err)
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = deleteEventByIdRoute
