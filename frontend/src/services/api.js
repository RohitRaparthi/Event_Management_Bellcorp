const API_URL = 'http://localhost:5000/api';

export const authAPI = {
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  }
};

export const eventsAPI = {
  getAll: async (search = '', category = '', location = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (location) params.append('location', location);

    const res = await fetch(`${API_URL}/events?${params}`);
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/events/${id}`);
    return res.json();
  }
};

export const registrationAPI = {
  getMyEvents: async (token) => {
    const res = await fetch(`${API_URL}/registrations/my-events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  register: async (eventId, token) => {
    const res = await fetch(`${API_URL}/registrations/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ eventId })
    });
    return res.json();
  },

  cancel: async (eventId, token) => {
    const res = await fetch(`${API_URL}/registrations/cancel/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};
