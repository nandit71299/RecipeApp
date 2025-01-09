import express from "express";
import {
  getAll,
  createRecipe,
  getSingle,
  deleteRecipe,
  updateRecipe,
} from "../controllers/Recipe.js";

const router = express.Router();

router.get("/:_id", getSingle);
router.patch("/:id", updateRecipe);
router.delete("/:_id", deleteRecipe);

router.post("/", createRecipe);
router.get("/", getAll);

export default router;
