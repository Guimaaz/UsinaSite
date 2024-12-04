const Event = require('../models/Event')

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
    try {
      const eventDateUTC = new Date(this.eventDate)

      if (Number.isNaN(eventDateUTC.getTime())) {
        return this.res.status(400).send({ message: 'Invalid date format.' })
      }

      const event = new Event({
        name: this.name,
        content: this.content,
        imageUrl: this.imageUrl,
        eventDate: eventDateUTC,
      })

      event.save()
      return this.res
        .status(201)
        .send({ message: 'Event created successfully', event })
    } catch (err) {
      console.error('Error creating event:', err)
      return this.res.status(500).send({ message: 'Error creating event' })
    }
  }

  async delete() {
    const eventExists = await this.validateIfExists('id')

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

  async update() {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        this.id,
        {
          name: this.name,
          content: this.content,
          imageUrl: this.imageUrl,
          eventDate: this.eventDate,
        },
        { new: true }
      );

      console.log(updatedEvent)
  
      return updatedEvent;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
}

module.exports = EventController
