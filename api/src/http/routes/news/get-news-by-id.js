const NewsController = require('../../../controllers/NewsController')

async function getNewsByIdRoute(app) {
  app.get('/news/:id', async (req, res) => {
    try {
      const { id } = req.params

      const newsController = new NewsController(id, ...Array(3), res)
      await newsController.getById()
    } catch (err) {
      throw new Error('Error at filtering news', err)
    }
  })
}

module.exports = getNewsByIdRoute
