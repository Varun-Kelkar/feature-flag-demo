import styles from "./RecipeCard.module.scss";

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard"; // assuming finite options
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[]; // e.g., ["Dinner"]
};
type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
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
          <span>Rating : {recipe.rating}</span>
        </div>
        <div>Difficuly {recipe.difficulty}</div>
        <div>Calories {recipe.caloriesPerServing}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
