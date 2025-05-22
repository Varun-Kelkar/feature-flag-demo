import { useEffect, useState } from "react";
import styles from "./AuthForm.module.scss";
import { useUser } from "../../userContext";
import { freePlanUser, premiumPlanUser } from ".././../mockusers";
import { useNavigate } from "react-router";
type Mode = "login" | "signup";

export default function AuthForm({ mode = "login" }: { mode?: Mode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isUserVerified = verifyUser();
    if (!isUserVerified) {
      setError("Invalid username or password");
      return;
    }
    navigate("/recipes");
    setError("");
  };

  const verifyUser = () => {
    if (username === freePlanUser.email && password === freePlanUser.password) {
      setUser({ ...freePlanUser, plan: "free" });
      return true;
    }
    if (
      username === premiumPlanUser.email &&
      password === premiumPlanUser.password
    ) {
      setUser({ ...premiumPlanUser, plan: "premium" });
      return true;
    } else {
      return false;
    }
  };

  const isAlreadyLoggedIn = () => {
    if (user) {
      navigate("/recipes");
    }
  };

  useEffect(() => {
    isAlreadyLoggedIn();
  }, []);

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
    </div>
  );
}
