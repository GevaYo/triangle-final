

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MenuScreen from './pages/MenuScreen/MenuScreen.js';
// import EventCalendarPage from './pages/EventCalendarPage/EventCalendarPage.js';
// import ClubManagementPage from './pages/ClubManagementPage/ClubManagementPage.js';
// import SalesAnalysis from './pages/SalesAnalysis/SalesAnalysis.js';
// import Heder from './pages/pageLayout/Heder.js';
// import PageLayout from './pages/pageLayout/Heder.js';
// import LoginPage from './pages/LoginPage/LoginPage.js';

// const App = () => {
//   return (
//     <Router basename="/Triangle">
//     <PageLayout> 
//       <Routes>
//         <Route path="/" element={<MenuScreen />} />
//         <Route path="/event-calendar" element={<EventCalendarPage />} />
//         <Route path="/club-management" element={<ClubManagementPage />} />
//         <Route path="/sales-analysis" element={<SalesAnalysis />} />
//       </Routes>
//     </PageLayout> 
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './pages/MenuScreen/MenuScreen.js';
import EventCalendarPage from './pages/EventCalendarPage/EventCalendarPage.js';
import ClubManagementPage from './pages/ClubManagementPage/ClubManagementPage.js';
import SalesAnalysis from './pages/SalesAnalysis/SalesAnalysis.js';
import Heder from './pages/pageLayout/Heder.js';
import PageLayout from './pages/pageLayout/Heder.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import video from '../src/photos/video.mp4';


const App = () => {
  return (
    <Router basename="/Triangle">
      <Routes>
        <Route path="/" element={ <LoginPage/>} />
        <Route path="/menu" element={<PageLayout><MenuScreen /></PageLayout>} />
        <Route path="/event-calendar" element={<PageLayout><EventCalendarPage /></PageLayout>} />
        <Route path="/club-management" element={<PageLayout><ClubManagementPage /></PageLayout>} />
        <Route path="/sales-analysis" element={<PageLayout><SalesAnalysis /></PageLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
