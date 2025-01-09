import React from "react";
import { useQuery } from "@tanstack/react-query";
import Recipes from "../components/pageComponents/Recipes";
import { getAllRecipes } from "../utils/http";

function Homepage() {
  // Fetch the list of recipes
  const { data, isLoading, isError, error, isFetching, isRefetching } =
    useQuery({
      queryKey: ["recipes"],
      queryFn: getAllRecipes,
    });

  const recipes = data?.data?.recipes;

  let content = "No Recipes Found";
  if (isLoading || isFetching || isRefetching) {
    content = "Loading Recipes..."; // Show loading while fetching or refetching
  }

  if (isError) {
    content = "Error fetching recipes: " + error?.message;
  }

  return (
    <div>
      <h1>All Recipes</h1>
      {isLoading || isFetching || isRefetching ? (
        <p>{content}</p>
      ) : recipes && recipes.length > 0 ? (
        <Recipes recipes={recipes} />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}

export default Homepage;
