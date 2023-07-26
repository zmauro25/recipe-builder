import React, { useState } from "react";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";
import EditIngredient from "./EditIngredient";
import { v4 as uuid } from "uuid";

// hello testing!

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);

  const addItem = (ingredientText, ingredient, quantity, units) => {
    const new_id = uuid();
    const newIngredients = [
      {
        text: ingredientText,
        ingredient: ingredient,
        id: new_id,
        edit: false,
        quant: quantity,
        unit: units,
      },
      ...ingredients,
    ];
    setIngredients(newIngredients);
  };

  const deleteItem = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    setIngredients(
      ingredients.map((item) =>
        item.id === id ? { ...item, edit: !item.edit } : item
      )
    );
  };

  const editText = (ingredeintText, ingredient, quantity, units, id) => {
    setIngredients(
      ingredients.map((item) =>
        item.id === id
          ? {
              ...item,
              ingredient: ingredient,
              quant: quantity,
              unit: units,
              text: ingredeintText,
              edit: false,
            }
          : item
      )
    );
  };

  const handleHalve = () => {};

  const handleDouble = () => {};

  return (
    <div className="recipe-app">
      <h1 className="my-recipe">My Recipe</h1>
      <div className="magic-buttons">
        <form onSubmit={handleHalve}>
          <button
            type="submit"
            class="halve-btn btn btn-outline-secondary btn-sm"
          >
            {" "}
            Halve my Recipe!{" "}
          </button>
        </form>
        <form onSubmit={handleDouble}>
          <button
            type="submit"
            class="double-btn btn btn-outline-secondary btn-sm"
          >
            {" "}
            Double my Recipe!{" "}
          </button>
        </form>
      </div>
      <div className="list">
        <AddIngredient addItem={addItem} />
        {ingredients.map((ingredient) => {
          if (ingredient.edit) {
            return <EditIngredient id={ingredient.id} editText={editText} />;
          } else {
            return (
              <Ingredient
                ingredient={ingredient}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
