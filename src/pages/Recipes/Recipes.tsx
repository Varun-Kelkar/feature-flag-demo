import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeFilter from "../../components/RecipeFilter/RecipeFilter";
import FeatureFlag from "../../components/FeatureFlag/FeatureFlag";
import styles from "./Recipes.module.scss";
import type { Recipe } from "../../types/recipe";
import { useUser } from "../../userContext";
import { useNavigate } from "react-router";

const Recipes = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(true);

  const updateRecipes = useCallback((recipes: Array<Recipe>) => {
    if (!recipes.length) {
      loadRecipes();
      return;
    }
    setRecipes(recipes);
  }, []);

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const handleSearchRecipes = useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value;
      if (searchTerm) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/recipes/search?q=${searchTerm}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setRecipes(data.recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        loadRecipes();
      }
    }, 1000),
    []
  );

  const verifyUser = () => {
    if (!user) {
      navigate("/login");
      return;
    } else {
      loadRecipes();
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <main className={styles.recipesPage}>
      <header className={styles.header}>
        <h1>Recipes</h1>
        <p>Discover easy and delicious recipes tailored just for you.</p>
      </header>
      <section className={styles.search}>
        <input
          type="search"
          placeholder="Search for recipes..."
          onInput={handleSearchRecipes}
          className={styles.searchInput}
        />
      </section>
      <section className={styles.filters}>
        <FeatureFlag
          flagName="filter-by-tags"
          fallback={<div>Search filters coming soon...</div>}
        >
          <RecipeFilter updateRecipes={updateRecipes} />
        </FeatureFlag>
      </section>
      <section className={styles.recipes}>
        {recipes.length > 0 && !loading ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe?.id} recipe={recipe} />
          ))
        ) : (
          <div>Loading Recipes...</div>
        )}
      </section>
    </main>
  );
};

export default Recipes;
