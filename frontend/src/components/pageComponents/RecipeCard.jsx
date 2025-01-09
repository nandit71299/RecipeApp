import React from "react";
import styles from "./RecipeCard.module.css";
import { Form, useActionData, useNavigate, useSubmit } from "react-router-dom";

function RecipeCard({
  orientation = "portrait",
  _id,
  recipe,
  handleDelete,
  isDelLoading,
  isDelPending,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={
        orientation === "wide"
          ? styles.wideCardContainer
          : styles.portraitCardContainer
      }
      onClick={() => (orientation === "portrait" ? navigate(`${_id}`) : "")}
    >
      <div
        className={`${styles.card} ${
          orientation === "wide" ? styles.wide : styles.portrait
        }`}
      >
        <img src={recipe?.imageUrl} alt="Recipe" className={styles.cardImage} />
        <div>
          <h2>{recipe?.title}</h2>

          {/* Text content for wide or portrait */}
          <div className={styles.textContent}>
            <p className={styles.category}>
              <i className="fa-solid fa-user"></i>
              &nbsp;{recipe?.servings} Servings
            </p>
            <p className={styles.author}>
              <i className="fa-solid fa-clock"></i>
              &nbsp;{recipe?.prepTime} minutes
            </p>
          </div>
        </div>
        {orientation === "wide" && (
          <div className={styles.btnsContainer}>
            <button className={styles.editBtn} onClick={() => navigate("edit")}>
              Edit
            </button>
            <button className={styles.delBtn} onClick={() => handleDelete(_id)}>
              {isDelPending || isDelLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
