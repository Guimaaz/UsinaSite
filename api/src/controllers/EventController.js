const Event = require('../db/models/Event')

class EventController {
  id
  name
  content
  imageUrl
  eventDate
  res

  constructor(id, name, content, imageUrl, eventDate, res) {
    this.id = id
    this.name = name
    this.content = content
    this.imageUrl = imageUrl
    this.eventDate = eventDate
    this.res = res
  }

  store() {
    const event = new Event({
      name: this.name,
      content: this.content,
      imageUrl: this.imageUrl,
      eventDate: Date(this.eventDate),
    })

    try {
      event.save()
    } catch (err) {
      this.res.status(500).send({ message: 'Error creating event' })
    } finally {
      this.res.status(201).send({ message: 'Event created successfully' })
    }
  }

  async delete() {
    const eventExists = await this.validateIfExists()

    if (!eventExists) {
      return this.res
        .status(404)
        .send({ message: `Event with id: ${this.id} wasn't found` })
    }

    try {
      await Event.findByIdAndDelete(this.id)
    } catch (err) {
      this.res.status(500).send({ message: 'Error deleting event' })
    } finally {
      this.res.status(200).send({ message: 'Event deleted successfully' })
    }
  }

  async getAll() {
    try {
      const events = await Event.find({})

      this.res.status(200).send(events)
    } catch (err) {
      this.res.status(500).send({ message: 'Error retrieving events' })
    }
  }

  async getById() {
    const eventExists = await this.validateIfExists(this.id)

    if (!eventExists) {
      this.res.status(404).send({ message: 'Event not found' })
    }

    const event = await Event.findById(this.id)

    return this.res.status(200).send(event)
  }

  async validateIfExists(filterType) {
    if (filterType === 'name') {
      const event = await Event.find({
        name: this.name,
      })

      if (event.length > 0) return event

      return false
    }

    const event = await Event.findById(this.id)

    if (!event) {
      this.res.status(404).send({ message: 'Event not found' })

      return false
    }

    return true
  }
}

module.exports = EventController
