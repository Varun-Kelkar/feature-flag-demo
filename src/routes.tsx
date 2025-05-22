import { createBrowserRouter } from "react-router";
import App from "./App";
import Hero from "./components/Hero/Hero";
import Recipes from "./pages/Recipes/Recipes";
import RecipeDetails from "./pages/Recipes/RecipeDetails/RecipeDetails";
import LoginPage from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: Hero },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "recipes",
        children: [
          {
            index: true,
            Component: Recipes,
          },
          {
            path: ":recipeId",
            Component: RecipeDetails,
          },
        ],
      },
    ],
  },
]);
