import React from "react";
import RecipeCard from "./RecipeCard";

function Recipes({ recipes }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          orientation="portrait"
          key={index}
          recipe={recipe}
          _id={recipe?._id}
        />
      ))}
    </div>
  );
}

export default Recipes;
