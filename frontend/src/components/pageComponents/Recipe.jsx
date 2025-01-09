import React from "react";
import { deleteRecipeById, getRecipeById } from "../../utils/http";
import {
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import RecipeCard from "./RecipeCard";

function Recipe() {
  const data = useRouteLoaderData("recipe");
  const recipe = data?.recipe;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <RecipeCard recipe={recipe} orientation="wide" />
      <div style={{ textAlign: "center" }}>
        <h2>Ingredients</h2>
        <p>{recipe?.ingredients}</p>
        <h2>Instructions</h2>
        <p>{recipe?.instructions}</p>
        <h2>Preperation Time</h2>
        <p>Prep Time: {recipe?.prepTime} minutes</p>
        <h2>Servings</h2>
        <p>Servings: {recipe?.servings}</p>
      </div>
    </div>
  );
}

export default Recipe;

export async function loader({ request, params }) {
  const id = params.id;
  const response = await getRecipeById(id);
  return response.data;
}
export async function action({ request, params }) {
  const method = request.method;
  const id = params.id;

  if (method === "DELETE") {
    const response = await deleteRecipeById(id);

    if (response.data.success) {
      return redirect("/");
    }
  }
}
