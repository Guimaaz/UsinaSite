const News = require('../db/models/News')

class NewsController {
  id
  title
  content
  imageUrl
  res

  constructor(id, title, content, imageUrl, res) {
    this.id = id
    this.title = title
    this.content = content
    this.imageUrl = imageUrl
    this.res = res
  }

  store() {
    const news = new News({
      title: this.title,
      content: this.content,
      imageUrl: this.imageUrl,
    })

    try {
      news.save()
    } catch (err) {
      this.res.status(500).send({ message: 'Error creating news' })
    } finally {
      this.res.status(201).send({ message: 'News created successfully' })
    }
  }

  async delete() {
    const newsExists = await this.validateIfExists()

    if (!newsExists) {
      return this.res
        .status(404)
        .send({ message: `News with id: ${this.id} wasn't found` })
    }

    try {
      await News.findByIdAndDelete(this.id)
    } catch (err) {
      this.res.status(500).send({ message: 'Error deleting news' })
    } finally {
      this.res.status(200).send({ message: 'News deleted successfully' })
    }
  }

  async getAll() {
    try {
      const news = await News.find({})

      this.res.status(200).send(news)
    } catch (err) {
      this.res.status(500).send({ message: 'Error retrieving news' })
    }
  }

  async getById() {
    const newsExists = await this.validateIfExists(this.id)

    if (!newsExists) {
      this.res.status(404).send({ message: 'News not found' })
    }

    const news = await News.findById(this.id)

    return this.res.status(200).send(news)
  }

  async validateIfExists(filterType) {
    if (filterType === 'title') {
      const news = await News.find({
        title: this.title,
      })

      if (news.length > 0) return news

      return false
    }

    const news = await News.findById(this.id)

    if (!news) {
      this.res.status(404).send({ message: 'News not found' })

      return false
    }

    return true
  }
}

module.exports = NewsController
