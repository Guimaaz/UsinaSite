const EventController = require('../../../db/controllers/EventController')
const { getEventByIdSchema } = require('../../../utils/schemas/eventSchemas')

async function getEventByIdRoute(app) {
  app.get('/events/:id', async (req, res) => {
    try {
      const eventInformations = getEventByIdSchema.safeParse(req.params)

      if (!eventInformations.success || !eventInformations.data) {
        return res.status(400).send({
          error: 'The news informations are incomplete or invalid',
        })
      }

      const eventController = new EventController(
        eventInformations.data.id,
        ...Array(4),
        res
      )

      await eventController.getById()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = getEventByIdRoute
