import styles from "./dashboard.module.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BASE_URL from "../../constants";

export default function Dashboard() {
  const [shortenLink, setShortenLink] = useState("");
  const [value, setValue] = useState("");

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      const response = await axios.post(
        `${BASE_URL}/url`,
        { url: value },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      const { id } = response.data;
      setShortenLink(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error generating short URL:", error);
    }
  };

  const handleShareClick = () => {
    try {
      navigator.clipboard.writeText(shortenLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link to clipboard:", error);
    }
  };
  return (
    <div className={styles.Dashboard}>
      <ToastContainer />
      <div className={styles.heading}>
        URL <span>shortener</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="url here..."
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button className={styles.createBtn} onClick={handleClick}>
          Create url
        </button>
      </div>
      <div className={styles.result}>
        <p>{shortenLink}</p>
        <button onClick={handleShareClick}>Copy to clipboard</button>
      </div>
    </div>
  );
}
