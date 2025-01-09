import React from "react";
import { Form, useNavigation } from "react-router-dom";
import styles from "./RecipeForm.module.css";

function RecipeForm({ method, recipe }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  return (
    <div className={styles.mainContainer}>
      <h2 style={{ textAlign: "center" }}>
        {method === "post" ? "Add New Recipe" : "Edit Recipe"}
      </h2>

      <Form
        method={method}
        className={styles.form}
        action={recipe ? `/${recipe._id}/edit` : "/"}
      >
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
          defaultValue={recipe ? recipe.instructions : " "}
        />
        <input
          type="number"
          name="prepTime"
          placeholder="Prep Time"
          defaultValue={recipe ? recipe.prepTime : " "}
        />
        <input
          type="servings"
          name="servings"
          placeholder="Servings"
          defaultValue={recipe ? recipe.servings : " "}
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image"
          defaultValue={recipe ? recipe.imageUrl : " "}
        />
        <button className={styles.btn} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}

export default RecipeForm;
