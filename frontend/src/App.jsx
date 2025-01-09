import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import AddNewRecipe from "./pages/AddNewRecipe";
import EditRecipe from "./pages/EditRecipe";
import Homepage, {
  loader as homePageLoader,
  action as recipeManipulationAction,
} from "./pages/Homepage";
import Recipe, {
  loader as recipePageLoader,
  action as recipeDeleteAction,
} from "./components/pageComponents/Recipe";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    action: recipeManipulationAction,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: homePageLoader,
        id: "homepage",
      },
      { path: "/new", element: <AddNewRecipe /> },
      {
        path: ":id", // This route is for individual recipes, ensuring the id is passed
        loader: recipePageLoader,
        id: "recipe",
        children: [
          {
            index: true,
            element: <Recipe />,
            action: recipeDeleteAction,
          },
          {
            path: "edit", // Edit path for PATCH action
            element: <EditRecipe />,
            action: recipeManipulationAction, // The same action handling the PATCH
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
