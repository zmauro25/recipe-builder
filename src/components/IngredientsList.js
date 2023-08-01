import React, { useState } from "react";
import AddIngredient from "./AddIngredient";
import { Ingredient } from "./Ingredient";
import EditIngredient from "./EditIngredient";
import { v4 as uuid } from "uuid";

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

  const handleChange = (multiplier) => {
    const newIngredients = [];
    console.log("hello");

    for (let i = 0; i < ingredients.length; i++) {
      const newQuantStr = (ingredients[i].quant * multiplier).toFixed(1);

      console.log(newQuantStr);

      const newQuant = parseFloat(newQuantStr);

      console.log(newQuant);

      const plural_adjusted =
        newQuant === 1 ? ingredients[i].unit : ingredients[i].unit + "s";

      const units_adjusted =
        ingredients[i].units === "n/a" || ingredients[i].unit === "unit-type"
          ? " "
          : plural_adjusted + " of ";

      const newText =
        newQuantStr + " " + units_adjusted + ingredients[i].ingredient;

      const newIngredient = {
        ...ingredients[i],
        quant: newQuant,
        text: newText,
      };

      newIngredients.push(newIngredient);
    }

    setIngredients(newIngredients);
  };

  return (
    <div className="recipe-app">
      <h1 className="my-recipe">MY RECIPE</h1>
      <div className="magic-buttons">
        <button
          type="submit"
          className="halve-btn btn btn-outline-secondary btn-sm"
          onClick={() => handleChange(0.5)}
        >
          {" "}
          1/2{" "}
        </button>
        <button
          type="submit"
          className="double-btn btn btn-outline-secondary btn-sm"
          onClick={() => handleChange(2)}
        >
          {" "}
          2x{" "}
        </button>
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
