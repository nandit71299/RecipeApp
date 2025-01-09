import React from "react";
import { deleteRecipeById, getRecipeById } from "../../utils/http";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Recipe() {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isPending, isSuccess, isFetching } = useQuery(
    {
      queryKey: ["recipe"],
      queryFn: () => getRecipeById(id),
    }
  );

  const {
    mutate: delMutate,
    error: delError,
    isLoading: isDelLoading,
    isSuccess: isDelSuccess,
    isPending: isDelPending,
    data: delData,
  } = useMutation({
    mutationFn: deleteRecipeById,
    onSuccess: (data) => {
      if (data?.data?.success) {
        navigate("/");
        queryClient.invalidateQueries(["recipes"]);
        queryClient.invalidateQueries(["recipe"]);
      } else {
        return null;
      }
    },
  });
  const recipe = data?.data?.recipe;
  let content = null;
  if (isPending) {
    content = `Loading...`;
  }
  if (isLoading || isFetching) {
    content = `Loading Recipe...`;
  }
  if (error) {
    content = `Error fetching Recipe: ${error.message}`;
  }
  if (isSuccess) {
    content = null;

    // queryClient.invalidateQueries(["recipe"]);
  }

  const handleDelete = async (_id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmation) delMutate(_id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {content ? (
        <p>{content}</p>
      ) : (
        <div>
          <RecipeCard
            recipe={recipe}
            _id={recipe._id}
            orientation="wide"
            handleDelete={handleDelete}
            isDelLoading={isDelLoading}
            isDelPending={isDelPending}
          />
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
      )}
    </div>
  );
}

export default Recipe;

// export async function loader({ request, params }) {
//   const id = params.id;
//   const response = await getRecipeById(id);
//   return response.data;
// }
// export async function action({ request, params }) {
//   const method = request.method;
//   const id = params.id;

//   if (method === "DELETE") {
//     const response = await deleteRecipeById(id);

//     if (response.data.success) {
//       return redirect("/");
//     }
//   }
// }
