import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeManager/RecipeCard";
import RecipeForm from "../components/RecipeManager/RecipeForm";
import RecipeModal from "../components/RecipeManager/RecipeModal";
import RecipeList from "../components/RecipeManager/RecipeList";
import "../styles/recipes.css";

const LOCAL_KEY = "recipes";
const CATEGORY_KEY = "categories";

const Recipes = () => {
  const [defaultRecipes, setDefaultRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Snacks",
      "Vegan"
    ]
  );

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((defaults) => {
        const users = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        setDefaultRecipes(defaults);
        setUserRecipes(users);
        mergeRecipes(defaults, users);
      })
      .catch(() => {
        const users = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        setDefaultRecipes([]);
        setUserRecipes(users);
        mergeRecipes([], users);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(userRecipes));
  }, [userRecipes]);

  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  }, [categories]);

  // Merge default and user recipes and remove duplicates based on title
  const mergeRecipes = (defaults, users) => {
    const merged = [...defaults, ...users].filter(
      (r, i, arr) => i === arr.findIndex((x) => x.title === r.title)
    );
    setRecipes(merged);
  };

  // Filter recipes based on search and category filter
  const filteredRecipes = recipes.filter((r) => {
    const recipeTitle = (r.title ?? "").toLowerCase();
    const searchTerm = (search ?? "").toLowerCase();
    const matchesSearch = recipeTitle.includes(searchTerm);
    const matchesCategory = categoryFilter ? r.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (recipe) => {
    let newUsers;
    if (editingIndex !== null) {
      newUsers = [...userRecipes];
      newUsers[editingIndex - defaultRecipes.length] = recipe;
    } else {
      newUsers = [...userRecipes, recipe];
    }
    setUserRecipes(newUsers);
    mergeRecipes(defaultRecipes, newUsers);
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (index < defaultRecipes.length) {
      alert("Cannot delete default recipes.");
      return;
    }
    const newUsers = [...userRecipes];
    newUsers.splice(index - defaultRecipes.length, 1);
    setUserRecipes(newUsers);
    mergeRecipes(defaultRecipes, newUsers);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleCategoryAdd = (newCat) => {
    if (!categories.includes(newCat)) {
      setCategories([...categories, newCat]);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Recipe Manager</h1>
      </header>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          id="addRecipeBtn"
          onClick={() => {
            setEditingIndex(null);
            setShowForm(true);
          }}
        >
          Add Recipe
        </button>
      </div>

      {showForm && (
        <RecipeForm
          initialData={editingIndex !== null ? recipes[editingIndex] : null}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          onCategoryAdd={handleCategoryAdd}
          categories={categories}
        />
      )}

      <RecipeList
        recipes={filteredRecipes}
        onRecipeClick={(i) => setModalIndex(i)}
      />

      {modalIndex !== null && (
        <RecipeModal
          recipe={recipes[modalIndex]}
          onClose={() => setModalIndex(null)}
          onEdit={() => {
            handleEdit(modalIndex);
            setModalIndex(null);
          }}
          onDelete={() => {
            handleDelete(modalIndex);
            setModalIndex(null);
          }}
          isUser={modalIndex >= defaultRecipes.length}
        />
      )}
    </div>
  );
};

export default Recipes;
