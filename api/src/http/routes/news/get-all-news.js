const NewsController = require('../../../controllers/NewsController')

async function getAllNewsRoute(app) {
  app.get('/news', async (req, res) => {
    try {
      const newsController = new NewsController(...Array(4), res)

      await newsController.getAll()
    } catch (err) {
      throw new Error('Error at filtering news', err)
    }
  })
}

module.exports = getAllNewsRoute
