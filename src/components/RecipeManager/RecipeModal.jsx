import React from "react";
import "../../styles/recipes.css";

const RecipeModal = ({ recipe, onClose, onEdit, onDelete, isUser }) => {
  if (!recipe) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={recipe.image || "/placeholder.jpg"} alt={recipe.name} />
        <h3>{recipe.name}</h3>
        <p><strong>Category:</strong> {recipe.category}</p>
        <h4>Ingredients</h4>
        <p>{recipe.ingredients}</p>
        <h4>Instructions</h4>
        <p>{recipe.instructions}</p>

        <div className="form-actions">
          {isUser && (
            <>
              <button onClick={onEdit}>Edit</button>
              <button onClick={onDelete} id="cancelBtn">Delete</button>
            </>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
