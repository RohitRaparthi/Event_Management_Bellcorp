# Event Management Application

A simple and easy-to-use event management app where users can browse events, register for them, and manage their bookings. 🎉

## What This App Does

- **Browse Events**: See all available events with details like date, time, location, and category
- **Search & Filter**: Find events by name or filter by category (Technology, Design, Networking)
- **Register for Events**: Book a spot at any event
- **View Dashboard**: See your registered events (upcoming and past)
- **Cancel Registration**: Remove yourself from an event anytime
- **Track Seats**: See how many seats are available in each event

## How to Start the App

### Step 1: Install Required Programs

Make sure you have **Node.js** installed. Download from: https://nodejs.org/

### Step 2: Go to Backend Folder

```
cd Backend
```

### Step 3: Install Backend Dependencies

```
npm install
```

### Step 4: Start Backend Server

```
node server.js
```

You should see: `Server running on port 5000`

### Step 5: Open Another Terminal

Go to the frontend folder:

```
cd frontend
```

### Step 6: Install Frontend Dependencies

```
npm install
```

### Step 7: Start Frontend

```
npm start
```

The app will open in your browser automatically on `http://localhost:3000`

## How to Use the App

### Register (Sign Up)
1. Click "Register" on the login page
2. Enter your name, email, and password
3. Click "Register" button
4. You'll be logged in automatically

### Login
1. Enter your email and password
2. Click "Login" button

### Browse Events
1. Go to "Events" page
2. See all available events
3. Use search box to find events by name
4. Use category dropdown to filter by type

### Register for an Event
1. Find the event you like
2. Click "✨ Register" button
3. You'll see a success message
4. The event now appears in your dashboard

### View Your Events
1. Click "Dashboard" in the top menu
2. See two sections:
   - **Upcoming Events**: Events that haven't happened yet
   - **Past Events**: Events that already happened

### Cancel Registration
1. Go to Dashboard
2. Click "✕ Cancel Registration" on any upcoming event
3. The event will be removed from your dashboard
4. Seat count will increase

### Logout
1. Click your name at the top right
2. Click "Logout" button

## Features

- ✅ **User Authentication**: Login and register securely
- ✅ **Event Browsing**: See all events with details
- ✅ **Search & Filter**: Find events easily
- ✅ **Event Registration**: Book spots instantly
- ✅ **Dashboard**: Manage your registrations
- ✅ **Seat Management**: Know how many seats are left
- ✅ **Responsive Design**: Works on phone, tablet, and desktop
- ✅ **Simple Colors**: Clean and easy-to-read interface

## What You'll See

### Navigation Bar
- App logo and name at the left
- "Events" and "Dashboard" links in the middle
- Your name and logout button at the right

### Events Page
- Search box to find events
- Category filter dropdown
- Grid of event cards showing:
  - Event name
  - Organizer name
  - Location
  - Date and time
  - Category
  - Description
  - Available seats
  - Register button

### Dashboard Page
- Welcome message with your name
- Two sections: Upcoming and Past events
- Cancel button for upcoming events

### Login/Register Page
- Simple form to enter details
- Register or Login button
- Error messages if something goes wrong

## Files & Folders

```
Event_Management_Assignment/
├── Backend/           (Server code)
│   ├── server.js      (Main server)
│   ├── routes/        (API endpoints)
│   ├── middleware/    (Authentication)
│   └── events.db      (Database)
│
├── frontend/          (Website code)
│   ├── src/
│   │   ├── pages/     (Login, Events, Dashboard)
│   │   ├── context/   (User data management)
│   │   ├── services/  (API communication)
│   │   └── App.js     (Main app)
│   └── package.json
│
└── README.md          (This file)
```

## Technology Used

**Backend:**
- Node.js (Server)
- Express (Framework)
- SQLite (Database)
- Bcrypt (Password encryption)
- JWT (Secure tokens)

**Frontend:**
- React (Website framework)
- React Router (Page navigation)
- CSS3 (Styling)

## Sample Data

The app comes with 5 sample events:

1. **React Workshop** - March 15, New York
2. **Web Design Conference** - April 10, San Francisco
3. **Node.js Bootcamp** - March 20, Austin
4. **Startup Networking Event** - February 28, Los Angeles
5. **AI & Machine Learning Summit** - May 5, Boston

You can register for any of these events!

## Future Improvements

- Email notifications
- Event recommendations
- Add ratings and reviews
- Social media sharing
- Payment integration
- Admin panel to create events

---

## 👤 Author

**Rohit Raparthi**  
📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)