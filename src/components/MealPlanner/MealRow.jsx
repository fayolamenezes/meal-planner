import React, { useEffect, useRef } from 'react';
import { 
  getSavedMeal, 
  getSavedRecipeSelection, 
  saveMeal, 
  saveRecipeSelection 
} from './plannerUtils';

const MealRow = ({ day, meal, recipes, textareaRef }) => {
  const textarea = useRef();
  const select = useRef();

  useEffect(() => {
    const saved = getSavedMeal(day, meal);
    if (textarea.current) {
      textarea.current.value = saved;
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  }, [day, meal]);

  const handleTextareaChange = () => {
    if (!textarea.current) return;
    const value = textarea.current.value;
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    saveMeal(day, meal, value);
  };

  const handleSelectChange = () => {
    if (!select.current || !textarea.current) return;
    const selectedIndex = select.current.value;
    saveRecipeSelection(day, meal, selectedIndex);

    if (selectedIndex !== '') {
      const recipe = recipes[selectedIndex];
      if (recipe && !textarea.current.value.includes(recipe.name)) {
        const newText = textarea.current.value.trim()
          ? `${textarea.current.value.trim()}\n${recipe.name}`
          : recipe.name;
        textarea.current.value = newText;
        textarea.current.style.height = 'auto';
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
        saveMeal(day, meal, newText);
      }
    }
  };

  return (
    <div className="meal-row">
      <label htmlFor={`${day}-${meal}`}>{meal}</label>
      <textarea
        id={`${day}-${meal}`}
        ref={(el) => {
          textarea.current = el;
          if (textareaRef) textareaRef(el);
        }}
        placeholder={`What will you eat for ${meal}?`}
        onInput={handleTextareaChange}
      />
      <select
        ref={select}
        defaultValue={getSavedRecipeSelection(day, meal)}
        onChange={handleSelectChange}
      >
        <option value="">Select recipe...</option>
        {recipes.map((recipe, index) => (
          <option key={index} value={index}>
            {recipe.name || `Recipe ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MealRow;
