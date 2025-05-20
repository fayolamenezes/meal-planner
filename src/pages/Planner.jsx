import React from 'react';
import Planner from '../components/MealPlanner/Planner';
import '../styles/planner.css';

const PlannerPage = () => (
  <div className="planner-page">
    <h2>Weekly Meal Planner</h2>
    <Planner />
  </div>
);

export default PlannerPage;
