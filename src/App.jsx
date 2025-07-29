import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Setup from './pages/Setup';
import CalendarPage from "./pages/Calendar";
import Landing from './pages/Landing';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/calendar" element={<CalendarPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
