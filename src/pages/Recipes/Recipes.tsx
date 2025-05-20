import { useCallback, useEffect, useState } from "react";
import styles from "./Recipes.module.scss";
import RecipeCard, {
  type Recipe,
} from "../../components/RecipeCard/RecipeCard";
import RecipeFilter from "../../components/RecipeFilter/RecipeFilter";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(true);

  const updateRecipes = useCallback((recipes: Array<Recipe>) => {
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
      // For debugging purposes
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
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
          className={styles.searchInput}
        />
      </section>
      <section className={styles.filters}>
        <RecipeFilter updateRecipes={updateRecipes} />
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
