import { createBrowserRouter } from "react-router";
import App from "./App";
import Hero from "./components/Hero/Hero";
import Recipes from "./pages/Recipes/Recipes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: Hero },
      { path: "recipes", Component: Recipes },
    ],
  },
]);
