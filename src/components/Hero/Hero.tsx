import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Cook Smart, Eat Fresh</h1>
        <p>Discover easy and delicious recipes tailored just for you.</p>
        <button className={styles.cta}>Get Started</button>
      </div>
    </section>
  );
}
