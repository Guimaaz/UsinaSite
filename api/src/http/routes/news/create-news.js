const { newsDb } = require("../../../db")
const { matchImageUrl } = require('../../../utils/regex')

const validateIfNewsExists = require("../../../utils/news/validate-if-news-exists")
const createNews = require("../../../utils/news/create-news")

async function createNewsRoute(app) {
  app.post('/news/create', async (req, res) => {
    try {
      const { title, content, imageUrl } = req.body
      
      if (!content || !title || !imageUrl) {
        return res.status(400).send({ message: "Invalid data" })
      }

      matchImageUrl(imageUrl, res)

      const newsExists = validateIfNewsExists(eventDb, { title })

      if(newsExists) {
        return res.status(400).send({ message: `Event named "${title}" already exists` })
      }

      createNews(newsDb, { title, content, imageUrl })
    } catch(err) { 
      throw new Error('Error at creating news', err)
    }
  })
}

module.exports = createNewsRoute