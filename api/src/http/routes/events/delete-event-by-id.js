const EventController = require('../../../controllers/EventController')

async function deleteEventByIdRoute(app) {
  app.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params
      const eventController = new EventController(id, ...Array(4), res)

      await eventController.delete(id)
    } catch (err) {
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = deleteEventByIdRoute
