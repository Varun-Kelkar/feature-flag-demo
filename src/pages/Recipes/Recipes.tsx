import { useCallback, useEffect, useState } from "react";
import styles from "./Recipes.module.scss";
import RecipeCard, {
  type Recipe,
} from "../../components/RecipeCard/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);

  const handleFilterByTags = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const tagName = event.currentTarget.id;
      getRecipesByTag(tagName);
    },
    []
  );
  const loadRecipes = async () => {
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
  };

  const getAllRecipeTags = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/tags`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setTags(data);
    } catch (error) {
      console.error("Error fetching recipe tags:", error);
    }
  }, []);

  const getRecipesByTag = useCallback(async (tagName: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/tag/${tagName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes by tag:", error);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
    getAllRecipeTags();
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
        {tags.length > 0 && !loading ? (
          tags.map((tag) => (
            <span className={styles.chip} onClick={handleFilterByTags} id={tag}>
              {tag}
            </span>
          ))
        ) : (
          <div>Loading Tags...</div>
        )}
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
