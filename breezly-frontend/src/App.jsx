import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';          // <-- Import Dashboard
import PrivateRoute from './components/PrivateRoute';
import MoodTracker from "./pages/MoodTracker.jsx";
import WeeklyMoodChart from "./components/WeeklyMoodChart.jsx";
import Journal from "./pages/Journal";
import Navbar from './components/Navbar';
import ErrorBoundary from "./components/ErrorBoundary";
import './index.css';



function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />            {/* ✅ Only this for homepage */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/mood-chart" element={<WeeklyMoodChart />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
