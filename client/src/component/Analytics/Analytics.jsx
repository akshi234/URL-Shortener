import styles from "./analytics.module.css";
import { useState, useEffect } from "react";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../constants";

export default function Analytics({ onEditClick }) {
  const [url, setUrl] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      const response = await axios.get(`${BASE_URL}/url/visits`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      setUrl(response.data.totalShortenedUrls);
      console.log(response);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleDelete = async (shortId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      await axios.delete(`${BASE_URL}/url/delete/${shortId}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      toast.success("URL deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Error deleting URL");
    }
  };

  const handleEditClick = (urlData) => {
    onEditClick(urlData);
  };

  return (
    <div className={styles.analytics}>
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th className={styles.Sno}>S.No</th>
            <th>Shortener URL</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Analytics/visits</th>
          </tr>
        </thead>
        <tbody>
          {url.map((url, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{url.shortId}</td>
              <td>
                <img
                  src={editImg}
                  className={styles.images}
                  alt="Edit"
                  onClick={() => handleEditClick(url.shortId)}
                />
              </td>
              <td>
                <img
                  src={deleteImg}
                  className={styles.images}
                  alt="Delete"
                  onClick={() => handleDelete(url.shortId)}
                />
              </td>
              <td>{url.totalVisits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
