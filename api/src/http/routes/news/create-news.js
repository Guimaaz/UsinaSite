const { matchImageUrl } = require('../../../utils/regex')
const NewsController = require('../../../db/controllers/NewsController')

async function createNewsRoute(app) {
  app.post('/news/create', async (req, res) => {
    try {
      const { title, content, imageUrl } = req.body

      if (!content || !title || !imageUrl) {
        return res.status(400).send({ message: 'Invalid data' })
      }
      matchImageUrl(imageUrl, res)

      const newsController = new NewsController(
        undefined,
        title,
        content,
        imageUrl,
        res
      )

      const newsExists = await newsController.validateIfExists('title')

      if (newsExists) {
        return res
          .status(400)
          .send({ message: `News named "${title}" already exists` })
      }

      newsController.store()
    } catch (err) {
      console.log(err)
    }
  })
}

module.exports = createNewsRoute
