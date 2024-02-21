import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function CreateRecipe() {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [cookies, _] = useCookies(["access_token"]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e, idx) => {
    const ingredients = recipe.ingredients;
    ingredients[idx] = e.target.value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://recipe-project-shabeel.onrender.com/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("recipe created!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        ></input>
        <label htmlFor="ingredients"> Ingredients </label>
        {recipe.ingredients.map((ingredient, idx) => {
          return (
            <input
              key={idx}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => {
                handleIngredientChange(event, idx);
              }}
            ></input>
          );
        })}
        <button type="button" onClick={addIngredient}>
          Add Ingredients
        </button>
        <label htmlFor="instructions"> Instructions </label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl"> Image URL </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        ></input>
        <label htmlFor="cookingTime"> Cooking Time(minutes) </label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        ></input>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
