const EventController = require('../../../db/controllers/EventController')
const { createEventSchema } = require('../../../utils/schemas/eventSchemas')

async function createEventRoute(app) {
  app.post('/events/create', async (req, res) => {
    try {
      const eventInformations = createEventSchema.safeParse(req.body)

      if (!eventInformations.success || !eventInformations.data) {
        return res.status(400).send({
          error: 'The event informations are incomplete or invalid',
        })
      }

      const eventController = new EventController(
        undefined,
        eventInformations.data.name,
        eventInformations.data.content,
        eventInformations.data.imageUrl,
        eventInformations.data.eventDate,
        res
      )

      const eventExists = await eventController.validateIfExists('name')

      if (eventExists) {
        return res.status(400).send({
          message: `Event named "${eventInformations.data.name}" already exists`,
        })
      }

      eventController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = createEventRoute
