const NewsController = require('../../../db/controllers/NewsController')
const { deleteNewsByIdSchema } = require('../../../utils/schemas/newsSchemas')

async function getNewsByIdRoute(app) {
  app.get('/news/:id', async (req, res) => {
    try {
      const { id } = req.params

      const newsInformation = deleteNewsByIdSchema.safeParse(req.params)

      if (!newsInformation.success || !newsInformation.data) {
        return res.status(400).send({
          error: 'The news informations are incomplete or invalid',
        })
      }

      const newsController = new NewsController(id, ...Array(3), res)
      await newsController.getById()
    } catch (err) {
      throw new Error('Error at filtering news', err)
    }
  })
}

module.exports = getNewsByIdRoute
