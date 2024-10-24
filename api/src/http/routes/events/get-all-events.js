const EventController = require('../../../controllers/EventController')

async function getAllEventsRoute(app) {
  app.get('/events', async (req, res) => {
    try {
      const eventController = new EventController(...Array(5), res)

      const events = await eventController.getAll()

      return res.status(200).send({ events })
    } catch (err) {
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = getAllEventsRoute
