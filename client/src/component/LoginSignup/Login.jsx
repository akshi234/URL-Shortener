import { useState } from "react";
import styles from "./loginsignup.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../constants";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log(response);
      if (response?.data.jwttoken) {
        localStorage.setItem("token", response.data.jwttoken);
      }

      if (response?.data.status === "SUCCESS") {
        console.log(response);
        toast.success("Login Succesfully");
        navigate("/dashboard");
      } else {
        toast.error("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form className={styles.form}>
      <ToastContainer />
      <div className={styles.formDiv}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formDiv}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.signupBtn} onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}
