import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Login, Register } from './pages/Auth';
import { EventsList, Dashboard } from './pages/Events';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return <div className="loading-container">⏳ Loading...</div>;
  }
  
  return token ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/events" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
