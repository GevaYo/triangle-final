
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './pages/MenuScreen/MenuScreen.js';
import EventCalendarPage from './pages/EventCalendarPage/EventCalendarPage.js';
import ClubManagementPage from './pages/ClubManagementPage/ClubManagementPage.js';
import SalesAnalysis from './pages/SalesAnalysis/SalesAnalysis.js';
import ParetoAnalysisFormPage from './pages/ParetoAnalysisFormPage.js';
import VariationAnalysisPage from './pages/VariationAnalysisPage.js';
import PageLayout from './pages/pageLayout/Heder.js';
import LoginPage from './pages/LoginPage/LoginPage.js';

const App = () => {
  return (
    <Router basename="/Triangle">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<PageLayout><MenuScreen /></PageLayout>} />
        <Route path="/event-calendar" element={<PageLayout><EventCalendarPage /></PageLayout>} />
        <Route path="/club-management" element={<PageLayout><ClubManagementPage /></PageLayout>} />
        <Route path="/sales-analysis" element={<PageLayout><SalesAnalysis /></PageLayout>} />
        <Route path="/pareto-analysis" element={<PageLayout><ParetoAnalysisFormPage /></PageLayout>} />
        <Route path="/variation-analysis" element={<PageLayout><VariationAnalysisPage /></PageLayout>} />
      </Routes>
    </Router>
  );
};

export default App;





