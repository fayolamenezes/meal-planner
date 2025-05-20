import React from 'react';
import MealRow from './MealRow';
import { meals, saveMeal, showSaveIndicator } from './plannerUtils';

const DayDetail = ({ day, onBack, recipes }) => {
  const textareas = {};

  const handleSave = () => {
    meals.forEach((meal) => {
      const text = textareas[meal]?.value.trim() || '';
      saveMeal(day, meal, text);
    });
    showSaveIndicator();
  };

  return (
    <div className="day-cell full-detail">
      <h4>{day}</h4>
      {meals.map((meal) => (
        <MealRow
          key={meal}
          day={day}
          meal={meal}
          recipes={recipes}
          textareaRef={(el) => (textareas[meal] = el)}
        />
      ))}
      <div className="button-row" style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="back-button" onClick={onBack}>⬅ Back to Week View</button>
      </div>
    </div>
  );
};

export default DayDetail;
