import { useNavigate } from "react-router";
import type { Recipe } from "../../types/recipe";
import styles from "./RecipeCard.module.scss";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  const navigateToRecipeDetails = () => {
    navigate(`/recipes/${recipe.id}`);
  };
  return (
    <div className={styles.recipeCard}>
      <img
        src={recipe.image}
        alt="Recipe Image"
        loading="lazy"
        className={styles.recipeImage}
      />
      <div className={styles.recipeDetails}>
        <div>
          <h3>{recipe.name}</h3>
        </div>
        <button
          className={styles.recipeButton}
          onClick={navigateToRecipeDetails}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
