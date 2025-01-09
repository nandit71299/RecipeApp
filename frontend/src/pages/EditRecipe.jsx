import React from "react";
import RecipeForm from "../components/pageComponents/RecipeForm";
import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";

function EditRecipe() {
  const data = useRouteLoaderData("recipe");
  const recipe = data?.recipe;
  if (!recipe) {
    return null;
  }
  return <RecipeForm method={"patch"} recipe={recipe} />;
}

export default EditRecipe;
