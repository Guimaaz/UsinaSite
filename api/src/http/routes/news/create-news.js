const NewsController = require('../../../db/controllers/NewsController')
const { createNewsSchema } = require('../../../utils/schemas/newsSchemas')

async function createNewsRoute(app) {
  app.post('/news/create', async (req, res) => {
    try {
      const newsInformation = createNewsSchema.safeParse(req.body)

      if (!newsInformation.success || !newsInformation.data) {
        return res.status(400).send({
          error: 'The news informations are incomplete or invalid',
        })
      }

      const newsController = new NewsController(
        undefined,
        newsInformation.data.title,
        newsInformation.data.content,
        newsInformation.data.imageUrl,
        res
      )

      const newsExists = await newsController.validateIfExists('title')

      if (newsExists) {
        return res.status(400).send({
          message: `News named "${newsInformation.data.title}" already exists`,
        })
      }

      newsController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = createNewsRoute
