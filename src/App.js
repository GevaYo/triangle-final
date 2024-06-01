import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './pages/MenuScreen/MenuScreen';
import EventCalendarPage from './pages/EventCalendarPage/EventCalendarPage';
import ClubManagementPage from './pages/ClubManagementPage/ClubManagementPage';
import SalesAnalysis from './pages/SalesAnalysis/SalesAnalysis';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/event-calendar" element={<EventCalendarPage />} />
        <Route path="/club-management" element={<ClubManagementPage />} />
        <Route path="/sales-analysis" element={<SalesAnalysis />} />
      </Routes>
    </Router>
  );
};

export default App;
