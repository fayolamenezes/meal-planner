import React from "react";
import RecipeCard from "./RecipeCard";
import "../../styles/recipes.css";

const RecipeList = ({ recipes, onRecipeClick }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes to display.</p>;
  }

  return (
    <div className="card-grid">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id || index}
          recipe={recipe}
          onClick={() => onRecipeClick(index)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
