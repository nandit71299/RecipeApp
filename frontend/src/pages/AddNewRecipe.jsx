import React from "react";
import RecipeForm from "../components/pageComponents/RecipeForm";

function AddNewRecipe() {
  return <RecipeForm method={"post"} />;
}

export default AddNewRecipe;
