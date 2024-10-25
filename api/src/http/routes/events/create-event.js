const EventController = require('../../../db/controllers/EventController')
const { matchImageUrl, matchDate } = require('../../../utils/regex')

async function createEventRoute(app) {
  app.post('/events/create', async (req, res) => {
    try {
      const { name, content, eventDate, imageUrl } = req.body

      if (!name || !content || !eventDate || !imageUrl) {
        return res.status(400).send({ message: 'Invalid data' })
      }

      matchImageUrl(imageUrl, res)
      matchDate(eventDate, res)

      const eventController = new EventController(
        undefined,
        name,
        content,
        imageUrl,
        eventDate,
        res
      )

      const eventExists = await eventController.validateIfExists('name')

      if (eventExists) {
        return res
          .status(400)
          .send({ message: `Event named "${name}" already exists` })
      }

      eventController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = createEventRoute
