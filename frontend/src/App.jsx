import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Homepage = lazy(() => import("./pages/Homepage"));
const Recipe = lazy(() => import("./components/pageComponents/Recipe"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const EditRecipe = lazy(() => import("./pages/EditRecipe"));
const CircularLoader = lazy(() => import("./components/UI/CircularLoader"));
const AddNewRecipe = lazy(() => import("./pages/AddNewRecipe"));
const RootLayout = lazy(() => import("./components/Layout/RootLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <CircularLoader />,
    errorElement: <ErrorPage />,
    action: async ({ request, params }) =>
      import("./pages/Homepage").then((module) =>
        module.action({ request, params })
      ),
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: async () =>
          import("./pages/Homepage").then((module) => module.loader()),
        id: "homepage",
      },
      { path: "/new", element: <AddNewRecipe /> },
      {
        path: ":id", // This route is for individual recipes, ensuring the id is passed
        loader: async ({ request, params }) =>
          import("./components/pageComponents/Recipe").then((module) =>
            module.loader({ request, params })
          ),
        id: "recipe",
        children: [
          {
            index: true,
            element: <Recipe />,
            action: async ({ request, params }) =>
              import("./components/pageComponents/Recipe").then((module) =>
                module.action({ request, params })
              ),
          },
          {
            path: "edit", // Edit path for PATCH action
            element: <EditRecipe />,
            action: async ({ request, params }) =>
              import("./pages/Homepage").then((module) =>
                module.action({ request, params })
              ),
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
