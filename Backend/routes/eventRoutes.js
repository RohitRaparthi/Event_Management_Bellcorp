const express = require('express');

const router = express.Router();

const getEventWithSeats = (event) => {
  return new Promise((resolve, reject) => {
    global.db.get(
      'SELECT COUNT(*) as registrationCount FROM registrations WHERE eventId = ?',
      [event.id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const availableSeats = Math.max(0, event.capacity - (result?.registrationCount || 0));
          resolve({
            ...event,
            registrationCount: result?.registrationCount || 0,
            availableSeats: availableSeats
          });
        }
      }
    );
  });
};

router.get('/', (req, res) => {
  const { search, category, location } = req.query;

  let query = 'SELECT * FROM events WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (location) {
    query += ' AND location = ?';
    params.push(location);
  }

  global.db.all(query, params, async (err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching events' });
    }

    try {
      const eventsWithSeats = await Promise.all(
        events.map(event => getEventWithSeats(event))
      );
      res.json(eventsWithSeats);
    } catch (error) {
      res.status(500).json({ message: 'Error processing events' });
    }
  });
});

router.get('/:id', (req, res) => {
  global.db.get('SELECT * FROM events WHERE id = ?', [req.params.id], async (err, event) => {
    if (err || !event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    try {
      const eventWithSeats = await getEventWithSeats(event);
      res.json(eventWithSeats);
    } catch (error) {
      res.status(500).json({ message: 'Error processing event' });
    }
  });
});

router.post('/', (req, res) => {
  const { name, organizer, location, date, time, description, capacity, category } = req.body;

  global.db.run(
    'INSERT INTO events (name, organizer, location, date, time, description, capacity, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, organizer, location, date, time, description, capacity, category],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Error creating event' });
      }
      res.status(201).json({ message: 'Event created', eventId: this.lastID });
    }
  );
});

module.exports = router;
