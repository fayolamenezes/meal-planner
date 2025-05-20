import React, { useState, useRef, useEffect } from "react";

const RecipeForm = ({ initialData, onSave, onCancel, onCategoryAdd, categories }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [ingredients, setIngredients] = useState(initialData?.ingredients || "");
  const [instructions, setInstructions] = useState(initialData?.instructions || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [image, setImage] = useState(initialData?.image || "");
  const fileInputRef = useRef();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIngredients(initialData.ingredients);
      setInstructions(initialData.instructions);
      setCategory(initialData.category);
      setImage(initialData.image);
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) return;
    onSave({ name, ingredients, instructions, category, image });
  };

  const handleAddCategory = () => {
    const newCat = prompt("Enter new category:");
    if (newCat) {
      onCategoryAdd(newCat);
      setCategory(newCat);
    }
  };

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Recipe" : "Add Recipe"}</h3>

      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <button type="button" onClick={handleAddCategory}>
        + Add Category
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        id="imageUpload"
      />
      <label htmlFor="imageUpload">Upload Image</label>

      {image && <img className="preview-image" src={image} alt="Preview" />}

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" id="cancelBtn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
