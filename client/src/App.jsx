import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// 🧱 Tus páginas (usa placeholders por ahora)
const Home = () => <h2 style={{ padding: '1rem' }}>Welcome to D&D Assistant Tool</h2>;
const Campaigns = () => <h2 style={{ padding: '1rem' }}>Campaigns Page</h2>;
const NPCGenerator = () => <h2 style={{ padding: '1rem' }}>NPC Generator Page</h2>;
const Characters = () => <h2 style={{ padding: '1rem' }}>Characters Page</h2>;
const Sessions = () => <h2 style={{ padding: '1rem' }}>Sessions Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/npc-generator" element={<NPCGenerator />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </Router>
  );
}

export default App;
