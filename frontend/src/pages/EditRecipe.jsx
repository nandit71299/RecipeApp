import React from "react";
import RecipeForm from "../components/pageComponents/RecipeForm";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecipeById, updateRecipeById } from "../utils/http";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    staleTime: 0,
  });

  const {
    mutate,
    isPending: isUpdating, // This is the state to control button text
  } = useMutation({
    mutationFn: (updatedData) => updateRecipeById(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipe"]);
      navigate(`/${id}`);
    },
  });

  const handleUpdateRecipe = (updatedData) => {
    mutate(updatedData); // Triggers the mutation when the form is submitted
  };

  if (isLoading) return "Loading recipe...";
  if (error) return `Error fetching recipe: ${error.message}`;

  return (
    <RecipeForm
      method="patch"
      recipe={data?.data?.recipe}
      handleUpdateRecipe={handleUpdateRecipe}
      isUpdating={isUpdating}
    />
  );
}

export default EditRecipe;
