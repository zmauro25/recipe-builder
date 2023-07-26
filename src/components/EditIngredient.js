import React from "react";
import { useState } from "react";

export default function EditIngredient({ id, editText }) {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState("");

  const handleIngredient = (e) => {
    setIngredient(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnits = (e) => {
    setUnits(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const plural_adjusted = quantity === 1 ? units : units + "s";

    const units_adjusted =
      units === "n/a" || units === "unit-type" ? " " : plural_adjusted + " of ";

    const ingredeintText = quantity + " " + units_adjusted + ingredient;

    editText(ingredeintText, ingredient, quantity, units, id);

    setIngredient("");
  };

  return (
    <form className="add-ingredient" onSubmit={handleSubmit}>
      <input
        className="add-quant"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantity}
        required
      ></input>
      <div className="dropdown-units">
        <label for="units"></label>
        <select name="units" id="units" value={units} onChange={handleUnits}>
          <option value="unit-type">Unit Type</option>
          <option value="n/a">n/a</option>
          <option value="teaspoon">teaspoon</option>
          <option value="tablespoon">tablespoon</option>
          <option value="cup">cup</option>
          <option value="gram">gram</option>
          <option value="ounce">oz</option>
          <option value="ml">ml</option>
        </select>
      </div>
      <input
        className="add-text"
        type="text"
        placeholder="Update ingredient here..."
        value={ingredient}
        onChange={handleIngredient}
        required
      ></input>
      <button type="submit" class="add-btn btn btn-outline-secondary btn-sm">
        {" "}
        Update{" "}
      </button>
    </form>
  );
}
