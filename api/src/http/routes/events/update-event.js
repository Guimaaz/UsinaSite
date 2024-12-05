const EventController = require('../../../db/controllers/EventController');
const { updateEventSchema } = require('../../../utils/schemas/eventSchemas');

async function updateEventRoute(app) {
  app.put('/events/update/:id', async (req, res) => {
    try {
      const eventInformations = updateEventSchema.safeParse(req.body);

      if (!eventInformations.success || !eventInformations.data) {
        return res.status(400).send({
          error: 'The event informations are incomplete or invalid',
        });
      }

      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ error: 'Event ID is required' });
      }

      const eventController = new EventController(
        id,
        eventInformations.data.name,
        eventInformations.data.content,
        eventInformations.data.imageUrl,
        eventInformations.data.eventDate,
        res
      );

      const eventExists = await eventController.validateIfExists('id');
      console.log(eventExists);

      if (!eventExists) {
        return res.status(404).send({ error: 'Event not found' });
      }

      await eventController.update();
      res.status(200).send({ message: 'Event updated successfully' });
    } catch (err) {
      console.error('Erro na rota de atualização:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
}

module.exports = updateEventRoute;
