import Recipes from "../models/Recipes.js";

export const getAll = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    setTimeout(() => {
      res.send({ success: true, recipes: recipes });
    }, 1500);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getSingle = async (req, res) => {
  try {
    const id = req.params._id;
    const recipe = await Recipes.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }
    setTimeout(() => {
      res.json({ success: true, recipe: recipe });
    }, 1500);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, prepTime, servings, imageUrl } =
    req.body;

  if (!title || !ingredients || !instructions || !prepTime || !servings) {
    return res
      .status(422)
      .json({ success: false, error: "All fields are required" });
  }
  const newRecipe = new Recipes({
    title,
    ingredients,
    instructions,
    prepTime,
    servings,
    imageUrl,
  });

  try {
    const savedRecipe = await newRecipe.save();
    setTimeout(() => {
      res.json({ success: true, recipe: savedRecipe });
    }, 1500);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(_id);
    if (!deletedRecipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }
    setTimeout(() => {
      res.json({ success: true, message: "Recipe deleted successfully" });
    }, 1500);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, prepTime, servings, imageUrl } =
      req.body;

    if (!title || !ingredients || !instructions || !prepTime || !servings) {
      return res
        .status(422)
        .json({ success: false, error: "All fields are required" });
    }

    const updateObj = {
      title,
      ingredients,
      instructions,
      prepTime,
      servings,
      imageUrl,
    };

    const updatedRecipe = await Recipes.findByIdAndUpdate(id, updateObj);
    if (updatedRecipe) res.json({ success: true, recipe: updatedRecipe });
    else {
      setTimeout(() => {
        return res
          .status(404)
          .json({ success: false, error: "Recipe not found" });
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
