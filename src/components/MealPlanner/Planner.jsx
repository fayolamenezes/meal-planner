import React, { useEffect, useState } from 'react';
import DayDetail from './DayDetail';
import { days, loadInitialRecipes, getSavedMeal } from './plannerUtils';

const Planner = () => {
  const [combinedRecipes, setCombinedRecipes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    loadInitialRecipes().then(setCombinedRecipes);
  }, []);

  if (selectedDay) {
    return (
      <DayDetail
        day={selectedDay}
        onBack={() => setSelectedDay(null)}
        recipes={combinedRecipes}
      />
    );
  }

  return (
    <div className="grid">
      {days.map((day) => (
        <div
          key={day}
          className="day-cell"
          onClick={() => setSelectedDay(day)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setSelectedDay(day);
          }}
        >
          <h4>{day}</h4>
          <ul className="meal-summary">
            {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => {
              const mealText = getSavedMeal(day, meal);
              return mealText ? (
                <li key={meal}>
                  <strong>{meal}:</strong> {mealText}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Planner;
