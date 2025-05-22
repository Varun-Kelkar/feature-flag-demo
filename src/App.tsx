import { Link, Outlet, useNavigate } from "react-router";
import styles from "./App.module.scss";
import { useUser } from "./userContext";

function App() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className={styles.app}>
      <header className={styles.appHeader}>
        <Link to="/">
          <h2>Foodies</h2>
        </Link>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className={styles.appContent}>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
