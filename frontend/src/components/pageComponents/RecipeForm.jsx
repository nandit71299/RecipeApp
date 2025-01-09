import React from "react";
import styles from "./RecipeForm.module.css";

function RecipeForm({
  method,
  recipe,
  handleUpdateRecipe,
  isUpdating,
  handleCreateRecipe,
  isCreatePending,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipeData = Object.fromEntries(formData.entries());
    if (method == "patch") {
      handleUpdateRecipe(recipeData);
    } else if (method == "post") {
      handleCreateRecipe(recipeData);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2 style={{ textAlign: "center" }}>
        {method === "post" ? "Add New Recipe" : "Edit Recipe"}
      </h2>

      <form method="post" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={recipe ? recipe.title : ""}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          rows={5}
          defaultValue={recipe ? recipe.ingredients : ""}
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          rows={5}
          defaultValue={recipe ? recipe.instructions : ""}
        />
        <input
          type="number"
          name="prepTime"
          placeholder="Prep Time"
          defaultValue={recipe ? recipe.prepTime : ""}
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          defaultValue={recipe ? recipe.servings : ""}
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          defaultValue={recipe ? recipe.imageUrl : ""}
        />
        <button className={styles.btn} type="submit">
          {isUpdating
            ? "Updating..."
            : method === "post"
            ? isCreatePending
              ? "Submitting..."
              : "Submit"
            : "Update"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
