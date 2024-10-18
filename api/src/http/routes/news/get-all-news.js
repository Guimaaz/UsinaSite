const { newsDb } = require('../../../db')

const getNews = require('../../../utils/news/get-news')

async function getAllNewsRoute(app) {
  app.get('/news', async (req, res) => {
    try {
      const news = getNews(newsDb, 'all')

      return res.status(200).send({ news })
    } catch (err) {
      throw new Error('Error at filtering news', err)
    }
  })
}

module.exports = getAllNewsRoute
