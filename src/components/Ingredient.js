import React from "react";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export const Ingredient = ({ ingredient, deleteItem, editItem }) => {
  const [isComplete, setIsComplete] = useState(false);

  const markComplete = () => {
    setIsComplete(!isComplete);
  };

  return (
    <div class="ingredient">
      <input
        className="checkbox form-check-input"
        type="checkbox"
        value=""
        id="check"
        onClick={markComplete}
      />
      <label className="checkbox-label" for="check">
        <p
          style={{
            textDecoration: isComplete ? "line-through" : "none",
          }}
          className="ingredient-text"
        >
          {ingredient.text}
        </p>
      </label>
      <div className="icons">
        <FaEdit className="edit-icon" onClick={() => editItem(ingredient.id)} />
        <FaTrash
          className="del-icon"
          onClick={() => deleteItem(ingredient.id)}
        />
      </div>
    </div>
  );
};
