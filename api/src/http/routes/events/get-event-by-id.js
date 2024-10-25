const EventController = require('../../../db/controllers/EventController')

async function getEventByIdRoute(app) {
  app.get('/events/:id', async (req, res) => {
    try {
      const { id } = req.params
      const eventController = new EventController(id, ...Array(4), res)

      await eventController.getById()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = getEventByIdRoute
