import { useNavigate } from "react-router";
import styles from "./Hero.module.scss";
import { useCallback } from "react";

export default function Hero() {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate("/recipes");
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Cook Smart, Eat Fresh</h1>
        <p>Discover easy and delicious recipes tailored just for you.</p>
        <button className={styles.cta} onClick={handleNavigation}>
          Get Started
        </button>
      </div>
    </section>
  );
}
