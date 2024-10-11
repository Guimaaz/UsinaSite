const { newsDb } = require("../../../db")
const deleteNews = require("../../../utils/news/delete-news")

async function deleteNewsByIdRoute(app) {
  app.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params

      deleteNews(newsDb, id)

      return res.status(200).send({ message: 'Event deleted successfully' })
    } catch(err) { 
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = deleteNewsByIdRoute