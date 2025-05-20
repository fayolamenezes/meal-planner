export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

/**
 * Load initial recipes from /recipes.json combined with user recipes saved in localStorage.
 * If no recipes are saved, initialize localStorage with defaults.
 * Returns a Promise resolving to the combined array.
 */
export const loadInitialRecipes = () =>
  fetch('/recipes.json')
    .then((res) => res.json())
    .then((defaults) => {
      const user = JSON.parse(localStorage.getItem('userRecipes')) || [];
      const combined = [...defaults, ...user];
      if (!localStorage.getItem('recipes')) {
        localStorage.setItem('recipes', JSON.stringify(defaults));
      }
      return combined;
    })
    .catch(() => {
      // fallback to saved recipes or empty array if fetch fails
      return JSON.parse(localStorage.getItem('recipes')) || [];
    });

/**
 * Get the saved meal text for a given day and meal type from localStorage.
 */
export const getSavedMeal = (day, meal) => {
  const plans = JSON.parse(localStorage.getItem('mealPlans')) || {};
  return (plans[day] && plans[day][meal]) || '';
};

/**
 * Save a meal text entry for a specific day and meal.
 */
export const saveMeal = (day, meal, value) => {
  const plans = JSON.parse(localStorage.getItem('mealPlans')) || {};
  if (!plans[day]) plans[day] = {};
  plans[day][meal] = value;
  localStorage.setItem('mealPlans', JSON.stringify(plans));
};

/**
 * Get the saved recipe selection index for a given day and meal.
 */
export const getSavedRecipeSelection = (day, meal) => {
  const plans = JSON.parse(localStorage.getItem('mealPlans')) || {};
  return (plans[day]?.recipeSelections?.[meal]) || '';
};

/**
 * Save the recipe selection index for a given day and meal.
 */
export const saveRecipeSelection = (day, meal, index) => {
  const plans = JSON.parse(localStorage.getItem('mealPlans')) || {};
  if (!plans[day]) plans[day] = {};
  if (!plans[day].recipeSelections) plans[day].recipeSelections = {};
  plans[day].recipeSelections[meal] = index;
  localStorage.setItem('mealPlans', JSON.stringify(plans));
};

/**
 * Show the save indicator for 1 second.
 */
export const showSaveIndicator = () => {
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  el.classList.remove('hidden');
  clearTimeout(showSaveIndicator.timeout);
  showSaveIndicator.timeout = setTimeout(() => {
    el.classList.add('hidden');
  }, 1000);
};
