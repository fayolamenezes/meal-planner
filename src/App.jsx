import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import PlannerPage from './pages/Planner';
import GroceryListPage from './pages/GroceryList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/grocery-list" element={<GroceryListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
