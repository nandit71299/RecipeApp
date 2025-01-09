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

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedData) => updateRecipeById(id, updatedData),
    onSuccess: () => {
      navigate(`/${id}`);
    },
  });

  const handleUpdateRecipe = (updatedData) => {
    mutate(updatedData);
    queryClient.invalidateQueries(["recipe"]);
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
