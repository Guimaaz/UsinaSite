const NewsController = require('../../../db/controllers/NewsController')

async function deleteNewsByIdRoute(app) {
  app.delete('/news/:id', async (req, res) => {
    try {
      const { id } = req.params

      const newsController = new NewsController(id, ...Array(3), res)

      await newsController.delete()
    } catch (err) {
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = deleteNewsByIdRoute
