const { newsDb } = require("../../../db")

const getNews = require("../../../utils/news/get-news")

async function getNewsByIdRoute(app) {
  app.get('/news/:id', async (req, res) => {
    try {
      const { id } = req.params

      const news = getNews(newsDb, 'one', id)

      return res.status(200).send({ news })
    } catch(err) { 
      throw new Error('Error at filtering news', err)
    }
  })
}

module.exports = getNewsByIdRoute