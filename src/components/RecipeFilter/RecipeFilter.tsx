import { memo, useCallback, useEffect, useState } from "react";
import styles from "./RecipeFilter.module.scss";
import useIsMobile from "../../hooks/useIsMobile";
import type { Recipe } from "../../types/recipe";

type RecipeFilterProps = {
  updateRecipes: (recipes: Array<Recipe>) => void;
};

const RecipeFilter = memo(({ updateRecipes }: RecipeFilterProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isMobile = useIsMobile(768);

  const handleFilterByTags = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const tagName = event.currentTarget.id;
      getRecipesByTag(tagName);
      setActiveTag(tagName);
    },
    []
  );

  const handleFilterByTagsSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const tagName = event.target.value;
      getRecipesByTag(tagName);
      setActiveTag(tagName);
    },
    []
  );

  const handleClearAllFilters = useCallback(() => {
    setActiveTag(null);
    updateRecipes([]);
  }, []);

  const getAllRecipeTags = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/tags`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTags(data);
      setLoading(false);
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
      updateRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes by tag:", error);
    }
  }, []);

  useEffect(() => {
    getAllRecipeTags();
  }, []);

  return (
    <div className={styles.filtersContainer}>
      <header className={styles.filtersHeader}>
        <h3>Filters</h3>
        {activeTag && (
          <span className={styles.clearFilters} onClick={handleClearAllFilters}>
            Clear Filters
          </span>
        )}
      </header>

      <section className={styles.filters}>
        {loading && <div>Loading Tags...</div>}
        {isMobile && !loading && tags.length > 0 && (
          <>
            <label>Category</label>
            <select
              name="tags"
              className={styles.select}
              onChange={handleFilterByTagsSelect}
              value={activeTag || ""}
            >
              <option value="" disabled selected>
                Select a category
              </option>
              {tags.map((tag) => (
                <option key={tag} value={tag} id={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </>
        )}
        {!isMobile &&
          !loading &&
          tags.length > 0 &&
          tags.map((tag) => (
            <span
              className={`${styles.chip} ${
                activeTag === tag ? styles.active : ""
              }`}
              onClick={handleFilterByTags}
              id={tag}
              key={tag}
            >
              {tag}
            </span>
          ))}
      </section>
    </div>
  );
});

export default RecipeFilter;
