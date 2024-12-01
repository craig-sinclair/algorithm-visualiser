import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import BFS from './pages/BFS';
import DFS from './pages/DFS';
import KMP from './pages/KMP';
import Dijkstra from './pages/Dijkstra';
import PrimJarnik from './pages/PrimJarnik';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bfs" element={<BFS />} />
      <Route path="/dfs" element={<DFS />} />
      <Route path="/kmp" element={<KMP/>}/>
      <Route path="/djk" element={<Dijkstra />}/>
      <Route path='/prim' element={<PrimJarnik/>}/>
    </Routes>
  </Router>
);

export default App
