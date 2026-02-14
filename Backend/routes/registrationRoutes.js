const express = require('express');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.get('/my-events', protect, (req, res) => {
  global.db.all(
    `SELECT e.* FROM events e 
     INNER JOIN registrations r ON e.id = r.eventId 
     WHERE r.userId = ?`,
    [req.userId],
    (err, events) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching events' });
      }
      res.json(events);
    }
  );
});

router.post('/register', protect, (req, res) => {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ message: 'Event ID required' });
  }

  global.db.get('SELECT * FROM events WHERE id = ?', [eventId], (err, event) => {
    if (err || !event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    global.db.get(
      'SELECT COUNT(*) as count FROM registrations WHERE eventId = ?',
      [eventId],
      (err, result) => {
        if (result.count >= event.capacity) {
          return res.status(400).json({ message: 'Event is full' });
        }

        global.db.run(
          'INSERT INTO registrations (userId, eventId) VALUES (?, ?)',
          [req.userId, eventId],
          function (err) {
            if (err) {
              return res.status(400).json({ message: 'Already registered for this event' });
            }
            res.status(201).json({ message: 'Successfully registered' });
          }
        );
      }
    );
  });
});

router.delete('/cancel/:eventId', protect, (req, res) => {
  global.db.run(
    'DELETE FROM registrations WHERE userId = ? AND eventId = ?',
    [req.userId, req.params.eventId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error canceling registration' });
      }
      res.json({ message: 'Registration canceled' });
    }
  );
});

module.exports = router;
