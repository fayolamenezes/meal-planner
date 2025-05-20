import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/planner'); // navigate to Meal Planner page
  };

  return (
    <>
      <section className="hero">
        <h2>Welcome to Your Personal Recipe & Meal Planner</h2>
        <p>
          Organize your favorite recipes, plan weekly meals, and create smart grocery lists with ease.
        </p>
        <button className="cta-button" onClick={handleStartPlanning}>
          Start Planning
        </button>
      </section>

      <section className="features">
        <div className="feature">
          <h3>🍲 Save Recipes</h3>
          <p>Keep all your favorite meals in one place, organized and easy to access.</p>
        </div>
        <div className="feature">
          <h3>🗓️ Weekly Planner</h3>
          <p>Plan your meals day-by-day with a beautiful and responsive layout.</p>
        </div>
        <div className="feature">
          <h3>🛒 Smart Grocery List</h3>
          <p>Auto-generate your shopping list based on planned meals and custom items.</p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
