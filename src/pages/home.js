import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

function Home() {
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const res = await axios.put("http://localhost:3001/recipes", {
        userID,
        recipeID,
      }, {headers: {authorization: cookies.access_token}});
      setSavedRecipes(res.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1> Recipes </h1>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {" "}
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}{" "}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;