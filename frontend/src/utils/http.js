import axios from "axios";

const API_DOMAIN = `${import.meta.env.VITE_BACKEND_URI}`;
const API_PORT = `${import.meta.env.VITE_BACKEND_PORT}`;
const API_BASE_URL = `${API_DOMAIN}${API_PORT ? `:${API_PORT}` : ""}/api`;

export const getAllRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response;
};

export const deleteRecipeById = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response;
};

export const updateRecipeById = async (id, recipe) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, recipe);
  return response;
};

export const addNewRecipe = async (recipe) => {
  const response = await axios.post(`${API_BASE_URL}`, recipe, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  return response;
};
