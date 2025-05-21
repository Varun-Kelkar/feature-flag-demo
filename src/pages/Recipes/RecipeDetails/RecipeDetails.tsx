import { useEffect, useState } from "react";
import type { Recipe } from "../../../types/recipe";
import { useParams } from "react-router";
import styles from "./RecipeDetails.module.scss";
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const getRecipeById = async (recipeId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      getRecipeById(recipeId);
    }
  }, [recipeId]);

  return (
    <main className={styles.recipeDetailsPage}>
      {loading && <p>Loading Recipe...</p>}
      {recipe && (
        <section className={styles.recipeDetails}>
          <header className={styles.recipeHeader}>
            <h2>{recipe.name}</h2>
          </header>
          <div className={styles.recipeImageAndMetadata}>
            <img
              src={recipe.image}
              alt="Recipe Image"
              loading="lazy"
              className={styles.recipeImage}
            />
            <div className={styles.recipeMetadata}>
              <div className={styles.recipeMetadataItem}>
                <label>Meal Type</label>
                <div>
                  {recipe.mealType.map((type) => (
                    <span key={type}>{type} </span>
                  ))}
                </div>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Cuisine </label>
                <span>{recipe.cuisine}</span>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Cook Time</label>
                <span>{recipe.cookTimeMinutes} mins</span>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Prep Time</label>
                <span>{recipe.prepTimeMinutes} mins</span>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Servings</label>
                <span>{recipe.servings}</span>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Difficulty</label>
                <span>{recipe.difficulty}</span>
              </div>
              <div className={styles.recipeMetadataItem}>
                <label>Calories</label>
                <span>{recipe.caloriesPerServing} kcal</span>
              </div>
            </div>
          </div>
          <section className={styles.recipeRating}>
            <div>Rating</div>
            <span>
              {recipe.rating} ⭐ ({recipe.reviewCount})
            </span>
          </section>
          <section className={styles.recipeTags}>
            <div>Search By</div>
            <div>
              {recipe.tags.map((tag, index) => (
                <span key={index} className={styles.chip}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
          <section className={styles.recipeIngredients}>
            <div>Ingredients</div>
            <div>
              {recipe.ingredients.map((ingredient, index) => (
                <span key={index} className={styles.chip}>
                  {ingredient}
                </span>
              ))}
            </div>
          </section>
          <section className={styles.recipeInstructions}>
            <div>Instructions</div>
            <ul>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
};

export default RecipeDetails;
