import React from "react";
import RecipeForm from "../components/pageComponents/RecipeForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewRecipe } from "../utils/http";
import { useNavigate } from "react-router-dom";

function AddNewRecipe() {
  const navigate = useNavigate();
  const { mutate, data, isPending } = useMutation({
    mutationFn: addNewRecipe,
    onError: (error) => {
      console.error("Error adding new recipe:", error);
      return null; // Retry on error (optional)
    },
    onSuccess: (data) => {
      navigate("/");
    },
  });

  const handleCreateRecipe = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <RecipeForm
      method={"post"}
      handleCreateRecipe={handleCreateRecipe}
      isCreatePending={isPending}
    />
  );
}

export default AddNewRecipe;
