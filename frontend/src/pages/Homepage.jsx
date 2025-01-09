import React from "react";
import Recipes from "../components/pageComponents/Recipes";
import { getAllRecipes, updateRecipeById, addNewRecipe } from "../utils/http";
import { redirect, useLoaderData } from "react-router-dom";

function Homepage() {
  const data = useLoaderData();
  const recipes = data?.recipes;

  return (
    <div>
      <div>
        <h1>All Recipes</h1>
      </div>

      <div>
        {recipes && recipes.length > 0 ? (
          <Recipes recipes={recipes} />
        ) : (
          <p>No Recipes Found</p>
        )}
      </div>
    </div>
  );
}
export default Homepage;

export async function loader() {
  const response = await getAllRecipes();

  return response.data;
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
