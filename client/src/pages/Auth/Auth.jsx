import { useState } from "react";
import styles from "./auth.module.css";
import SignUp from "../../component/LoginSignup/SignUp";
import Login from "../../component/LoginSignup/Login";

export default function Auth() {
  const [activeButton, setActiveButton] = useState("signup"); // 'signup' or 'login'

  const handleLoginClick = () => {
    setActiveButton("login");
  };

  const handleSignUpClick = () => {
    setActiveButton("signup");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.heading}>URL shortener</h3>
          <div className={styles.authBtn}>
            <button
              className={activeButton === "signup" ? styles.active : ""}
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <button
              className={activeButton === "login" ? styles.active : ""}
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>

          {activeButton === "login" ? <Login /> : <SignUp />}
        </div>
      </div>
    </>
  );
}
