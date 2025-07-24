import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Campaigns from './pages/Campains';
import NPCGenerator from './pages/NpcGen';
import Characters from './pages/Characters';
import CharactersGen from './pages/CharactersGen';
import Sessions from './pages/Sessions';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>    
      <CssBaseline />
        <Router>
          <Navbar />    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/npc-generator" element={<NPCGenerator />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters-gen" element={<CharactersGen />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </Router>      
    </>
  );
}

export default App;
