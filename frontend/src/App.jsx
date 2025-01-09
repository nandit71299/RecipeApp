import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
        id: "homepage",
      },
      { path: "/new", element: <AddNewRecipe /> },
      {
        path: ":id",
        id: "recipe",
        children: [
          {
            index: true,
            element: <Recipe />,
          },
          {
            path: "edit",
            element: <EditRecipe />,
          },
        ],
      },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
