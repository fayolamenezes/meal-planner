import React from "react";
import "../../styles/recipes.css";

const RecipeCard = ({ recipe, onClick }) => (
  <div className="recipe-card" onClick={onClick}>
    <img
      src={recipe.image ? `${process.env.PUBLIC_URL}/${recipe.image}` : "/placeholder.jpg"}
      alt={recipe.title}
    />
    <h3>{recipe.title}</h3>
    <div className="category-label">{recipe.category}</div>
  </div>
);

export default RecipeCard;
