import mongoose, { Mongoose } from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Recipe model based on the schema
const Recipes = mongoose.model("Recipe", recipeSchema);

export default Recipes;
