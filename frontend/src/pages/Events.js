import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { eventsAPI, registrationAPI } from '../services/api';
import './Events.css';

export const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useContext(AuthContext);

  const fetchEvents = async (searchTerm = '', categoryTerm = '') => {
    try {
      setLoading(true);
      const data = await eventsAPI.getAll(searchTerm, categoryTerm);
      const processedData = data.map(event => ({
        ...event,
        availableSeats: event.availableSeats !== undefined ? event.availableSeats : event.capacity
      }));
      setEvents(processedData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = useCallback(async () => {
    if (!token) return;
    try {
      const data = await registrationAPI.getMyEvents(token);
      const ids = new Set(data.map(event => event.id));
      setRegisteredEventIds(ids);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents(search, category);
  }, [search, category]);

  useEffect(() => {
    if (token) {
      fetchMyEvents();
    }
  }, [token, fetchMyEvents]);

  const handleRegister = async (eventId) => {
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      const result = await registrationAPI.register(eventId, token);
      if (result.message === 'Successfully registered') {
        setSuccessMessage('✓ Registered successfully!');
        setRegisteredEventIds(new Set([...registeredEventIds, eventId]));
        setTimeout(() => setSuccessMessage(''), 3000);
        
        setTimeout(() => {
          fetchEvents(search, category);
        }, 300);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="events-container">
      <h2>Browse Events</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Technology">🖥️ Technology</option>
          <option value="Design">🎨 Design</option>
          <option value="Networking">🤝 Networking</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-text">⏳ Loading events...</p>
      ) : events.length === 0 ? (
        <p className="no-events">No events found. Try adjusting your search.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className={`event-card ${registeredEventIds.has(event.id) ? 'registered' : ''}`}>
              {registeredEventIds.has(event.id) && <div className="registered-badge">✓ REGISTERED</div>}
              <h3>{event.name}</h3>
              <p><strong>👤 Organizer:</strong> {event.organizer}</p>
              <p><strong>📍 Location:</strong> {event.location}</p>
              <p><strong>📅 Date:</strong> {event.date} <strong>⏰ Time:</strong> {event.time}</p>
              <p><strong>🏷️ Category:</strong> <span className="category-badge">{event.category}</span></p>
              <p className="description">{event.description}</p>
              <p className="capacity"><strong>💺 Available:</strong> {event.availableSeats || event.capacity} seats</p>
              <button 
                onClick={() => handleRegister(event.id)}
                className={registeredEventIds.has(event.id) ? 'registered-btn' : 'register-btn'}
                disabled={registeredEventIds.has(event.id) || (event.availableSeats || event.capacity) === 0}
              >
                {registeredEventIds.has(event.id) ? '✓ Registered' : (event.availableSeats || event.capacity) === 0 ? '❌ Sold Out' : '✨ Register'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const { token, user } = useContext(AuthContext);

  const fetchMyEvents = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await registrationAPI.getMyEvents(token);
      setRegisteredEvents(data);
    } catch (error) {
      console.error('Error fetching dashboard events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyEvents();
    }
  }, [token]);

  const handleCancel = async (eventId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      try {
        const result = await registrationAPI.cancel(eventId, token);
        if (result.message === 'Registration canceled') {
          setSuccessMessage('✓ Cancelled successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
          
          setTimeout(async () => {
            await fetchMyEvents();
          }, 300);
        } else {
          alert(result.message || 'Cancellation failed');
        }
      } catch (error) {
        console.error('Cancellation error:', error);
        alert('Cancellation failed. Please try again.');
      }
    }
  };

  const today = new Date();
  const upcomingEvents = registeredEvents.filter(event => new Date(event.date) >= today);
  const pastEvents = registeredEvents.filter(event => new Date(event.date) < today);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👋 Welcome, {user?.name || 'Guest'}!</h2>
        <p>Manage your registered events</p>
      </div>

      {successMessage && <div className="success-message dashboard">{successMessage}</div>}

      {loading ? (
        <p className="loading-text">⏳ Loading your events...</p>
      ) : registeredEvents.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-text">No registered events yet.</p>
          <p className="empty-subtext">Go to browse events to find something interesting!</p>
        </div>
      ) : (
        <>
          {upcomingEvents.length > 0 && (
            <div className="events-section">
              <h3 className="section-title upcoming">📅 Upcoming Events ({upcomingEvents.length})</h3>
              <div className="events-grid dashboard-grid">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="event-card dashboard-card upcoming-card">
                    <div className="event-status upcoming">Upcoming</div>
                    <h3>{event.name}</h3>
                    <p><strong>👤 Organizer:</strong> {event.organizer}</p>
                    <p><strong>📍 Location:</strong> {event.location}</p>
                    <p><strong>📅 Date:</strong> {event.date}</p>
                    <p><strong>⏰ Time:</strong> {event.time}</p>
                    <p><strong>🏷️ Category:</strong> <span className="category-badge">{event.category}</span></p>
                    <button onClick={() => handleCancel(event.id)} className="cancel-btn">
                      ✕ Cancel Registration
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="events-section">
              <h3 className="section-title past">🎉 Past Events ({pastEvents.length})</h3>
              <div className="events-grid dashboard-grid">
                {pastEvents.map((event) => (
                  <div key={event.id} className="event-card dashboard-card past-card">
                    <div className="event-status past">Completed</div>
                    <h3>{event.name}</h3>
                    <p><strong>👤 Organizer:</strong> {event.organizer}</p>
                    <p><strong>📍 Location:</strong> {event.location}</p>
                    <p><strong>📅 Date:</strong> {event.date}</p>
                    <p><strong>⏰ Time:</strong> {event.time}</p>
                    <p><strong>🏷️ Category:</strong> <span className="category-badge">{event.category}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
