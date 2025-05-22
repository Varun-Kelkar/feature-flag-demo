import { Link, Outlet } from "react-router";
import styles from "./App.module.scss";
import LogoutButton from "./components/LogoutButton/LogoutButton";

function App() {
  return (
    <main className={styles.app}>
      <header className={styles.appHeader}>
        <Link to="/">
          <h2>Foodies</h2>
        </Link>
        <LogoutButton />
      </header>
      <div className={styles.appContent}>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
