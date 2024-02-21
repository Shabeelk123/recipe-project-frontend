import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

function SavedRecipes() {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(
          `https://recipe-project-shabeel.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipes();
  }, [userID]);

  return (
    <div>
      <h1> Saved Recipes </h1>
      <ul>
        {savedRecipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
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

export default SavedRecipes;
