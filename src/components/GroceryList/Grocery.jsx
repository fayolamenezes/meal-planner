import React, { useEffect, useState } from 'react';

const Grocery = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('selectedRecipes')) || [];
    } catch {
      return [];
    }
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkedGroceryItems')) || {};
    } catch {
      return {};
    }
  });
  const [manualItems, setManualItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('manualGroceryItems')) || [];
    } catch {
      return [];
    }
  });
  const [manualInput, setManualInput] = useState('');

  useEffect(() => {
    async function fetchAllRecipes() {
      try {
        const defaultRecipes = await fetch('/recipes.json').then(res => res.json());
        const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const merged = [...defaultRecipes, ...userRecipes];
        const unique = merged.filter(
          (recipe, index, self) =>
            index === self.findIndex(r => (r.name || r.title) === (recipe.name || recipe.title))
        );
        setAllRecipes(unique);
      } catch (err) {
        console.error('Failed to load default recipes:', err);
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setAllRecipes(storedRecipes);
      }
    }
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes]);

  useEffect(() => {
    localStorage.setItem('checkedGroceryItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('manualGroceryItems', JSON.stringify(manualItems));
  }, [manualItems]);

  const toggleRecipeSelection = (index) => {
    setSelectedRecipes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const extractIngredients = () => {
    const ingredientsSet = new Set();

    selectedRecipes.forEach(idx => {
      const recipe = allRecipes[idx];
      if (!recipe || !recipe.ingredients) return;

      const rawIngredients = recipe.ingredients;

      if (typeof rawIngredients === 'string') {
        rawIngredients.split(',').forEach(ing => {
          const trimmed = ing.trim();
          if (trimmed) ingredientsSet.add(trimmed);
        });
      } else if (Array.isArray(rawIngredients)) {
        rawIngredients.forEach(ing => {
          if (typeof ing === 'string') {
            const trimmed = ing.trim();
            if (trimmed) ingredientsSet.add(trimmed);
          }
        });
      } else {
        const asString = String(rawIngredients);
        asString.split(',').forEach(ing => {
          const trimmed = ing.trim();
          if (trimmed) ingredientsSet.add(trimmed);
        });
      }
    });

    return Array.from(ingredientsSet);
  };

  const toggleCheckedItem = (item) => {
    setCheckedItems(prev => {
      const newChecked = { ...prev };
      if (newChecked[item]) {
        delete newChecked[item];
      } else {
        newChecked[item] = true;
      }
      return newChecked;
    });
  };

  const addManualItem = () => {
    const item = manualInput.trim();
    if (item && !manualItems.includes(item)) {
      setManualItems(prev => [...prev, item]);
      setManualInput('');
    }
  };

  const deleteManualItem = (item) => {
    setManualItems(prev => prev.filter(i => i !== item));
    setCheckedItems(prev => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
  };

  const clearList = () => {
    if (window.confirm('Clear all grocery items and selections?')) {
      setCheckedItems({});
      setManualItems([]);
      setSelectedRecipes([]);
    }
  };

  const ingredients = extractIngredients();

  return (
    <section className="container grocery-container">
      <h2>Grocery List</h2>

      <section className="recipe-checkboxes" aria-label="Select Recipes">
        {allRecipes.length === 0 && <p>Loading recipes...</p>}
        {allRecipes.map((recipe, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedRecipes.includes(index)}
              onChange={() => toggleRecipeSelection(index)}
            />
            {recipe.title || recipe.name}
          </label>
        ))}
      </section>

      <section className="manual-add">
        <input
          type="text"
          placeholder="Add manual grocery item"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addManualItem()}
          aria-label="Add manual grocery item"
        />
        <button onClick={addManualItem} aria-label="Add manual item">
          Add
        </button>
      </section>

      <ul className="grocery-items" aria-label="Grocery Items">
        {[...ingredients, ...manualItems].map((item, idx) => (
          <li key={`${item}-${idx}`}>
            <input
              type="checkbox"
              checked={!!checkedItems[item]}
              onChange={() => toggleCheckedItem(item)}
              id={`grocery-item-${idx}`}
            />
            <label htmlFor={`grocery-item-${idx}`}>{item}</label>
            {manualItems.includes(item) && (
              <button
                className="delete-btn"
                title="Delete this item"
                aria-label={`Delete ${item}`}
                onClick={() => deleteManualItem(item)}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="grocery-actions">
        <button onClick={clearList} aria-label="Clear grocery list">
          Clear List
        </button>
      </div>

      {/* Debugging */}
      {/* <pre>{JSON.stringify(allRecipes, null, 2)}</pre>
      <pre>{JSON.stringify(selectedRecipes, null, 2)}</pre> */}
    </section>
  );
};

export default Grocery;
