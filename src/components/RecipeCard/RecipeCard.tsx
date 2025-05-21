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
    <div className={styles.recipeCard} onClick={navigateToRecipeDetails}>
      <img
        src={recipe.image}
        alt="Recipe Image"
        loading="lazy"
        className={styles.recipeImage}
      />
      <div className={styles.recipeDetails}>
        <div>
          <h3>{recipe.name}</h3>
          <span>Rating : {recipe.rating}</span>
        </div>
        <div>Difficuly {recipe.difficulty}</div>
        <div>Calories {recipe.caloriesPerServing}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
