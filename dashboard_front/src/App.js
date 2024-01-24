import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './Home';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Advertising from './Advertising';
import Sales from './Sales';
import Customer from './Customer';
import Competitor from './Competitor';
import Feedback from './Feedback';
import Settings from './Settings';
import Alerts from './Alerts';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/advertising" element={<Advertising />} />
        <Route path="/sales-history" element={<Sales />} />
        <Route path="/customer-segmentation" element={<Customer />} />
        <Route path="/competitor-analysis" element={<Competitor />} />
        <Route path="/customer-feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;