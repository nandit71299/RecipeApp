import React, { Suspense } from "react";
import Recipes from "../components/pageComponents/Recipes";
import { getAllRecipes, updateRecipeById, addNewRecipe } from "../utils/http";
import { Await, redirect, useLoaderData } from "react-router-dom";

function Homepage() {
  const data = useLoaderData();
  const recipes = data?.recipes;

  return (
    <div>
      <div>
        <h1>All Recipes</h1>
      </div>
      <Suspense fallback={<div>Loading....</div>}>
        <Await resolve={recipes}>
          {(resolvedRecipes) => {
            return resolvedRecipes && resolvedRecipes.length > 0 ? (
              <Recipes recipes={resolvedRecipes} />
            ) : (
              <p>No Recipes Found</p>
            );
          }}
        </Await>
      </Suspense>
      <div></div>
    </div>
  );
}
export default Homepage;

async function loadRecipes() {
  const response = await getAllRecipes();
  return response.data;
}
export async function loader() {
  return loadRecipes();
}

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  // Convert FormData to plain object
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const id = params.id; // Retrieve the `id` from params

  if (method === "PATCH" && id) {
    const response = await updateRecipeById(id, data); // Pass the `id` along with form data
    if (response.data.success) {
      return redirect("/");
    }
  } else if (method === "POST") {
    const response = await addNewRecipe(data);
    if (response.data.success) {
      return redirect("/");
    }
  } else {
    return null;
  }
}
