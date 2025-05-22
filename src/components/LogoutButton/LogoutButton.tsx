import styles from "./LogoutButton.module.scss";
import { useNavigate } from "react-router";
import { useUser } from "../../userContext";
import { useEffect, useState } from "react";

const LogoutButton = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [hideLogout, setHideLogout] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleVisibility = () => {
    if (user) {
      setHideLogout(false);
    } else {
      setHideLogout(true);
    }
  };

  useEffect(() => {
    toggleVisibility();
  }, [user]);

  return !hideLogout ? (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  ) : null;
};

export default LogoutButton;
