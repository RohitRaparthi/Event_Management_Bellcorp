const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'events.db');
const db = new sqlite3.Database(dbPath);

const sampleEvents = [
  {
    name: 'React Workshop',
    organizer: 'Tech Academy',
    location: 'New York',
    date: '2026-03-15',
    time: '09:00',
    description: 'Learn React fundamentals',
    capacity: 50,
    category: 'Technology'
  },
  {
    name: 'Web Design Conference',
    organizer: 'Design Hub',
    location: 'San Francisco',
    date: '2026-04-10',
    time: '10:00',
    description: 'Latest trends in web design',
    capacity: 100,
    category: 'Design'
  },
  {
    name: 'Node.js Bootcamp',
    organizer: 'Code School',
    location: 'Austin',
    date: '2026-03-20',
    time: '14:00',
    description: 'Master backend development',
    capacity: 30,
    category: 'Technology'
  },
  {
    name: 'Startup Networking Event',
    organizer: 'Innovation Hub',
    location: 'Los Angeles',
    date: '2026-02-28',
    time: '18:00',
    description: 'Meet founders and investors',
    capacity: 200,
    category: 'Networking'
  },
  {
    name: 'AI & Machine Learning Summit',
    organizer: 'AI Institute',
    location: 'Boston',
    date: '2026-05-05',
    time: '09:00',
    description: 'Explore AI applications',
    capacity: 150,
    category: 'Technology'
  }
];

db.serialize(() => {
  sampleEvents.forEach((event) => {
    db.run(
      'INSERT OR IGNORE INTO events (name, organizer, location, date, time, description, capacity, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [event.name, event.organizer, event.location, event.date, event.time, event.description, event.capacity, event.category]
    );
  });
  console.log('Sample data inserted');
  db.close();
});
