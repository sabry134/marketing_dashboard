import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './Home';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;