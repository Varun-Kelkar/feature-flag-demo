import React, { memo, useCallback, useEffect, useState } from "react";
import type { Recipe } from "../RecipeCard/RecipeCard";
import styles from "./RecipeFilter.module.scss";
import useIsMobile from "../../hooks/useIsMobile";

type RecipeFilterProps = {
  updateRecipes: (recipes: Array<Recipe>) => void;
};

const RecipeFilter = memo(({ updateRecipes }: RecipeFilterProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useIsMobile(768);

  const handleFilterByTags = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      console.log(event.target);
      const tagName = event.currentTarget.id;
      getRecipesByTag(tagName);
    },
    []
  );

  const handleFilterByTagsSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const tagName = event.target.value;
      getRecipesByTag(tagName);
    },
    []
  );
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
      console.log(data);
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
      <h3>Filters</h3>
      <section className={styles.filters}>
        {loading && <div>Loading Tags...</div>}
        {isMobile && !loading && tags.length > 0 && (
          <>
            <label>Category</label>
            <select
              name="tags"
              className={styles.select}
              onChange={handleFilterByTagsSelect}
            >
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
            <span className={styles.chip} onClick={handleFilterByTags} id={tag}>
              {tag}
            </span>
          ))}
      </section>
    </div>
  );
});

export default RecipeFilter;
