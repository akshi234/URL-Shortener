import { useState } from "react";
import Analytics from "../Analytics/Analytics";
import Dashboard from "../Dashboard/Dashboard";
import styles from "./sidebar.module.css";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const [setAuthenticated] = useState(true);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");

    setAuthenticated(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.sideBar}>
        <div className={styles.heading}>URL Shortener</div>
        <div className={styles.content}>
          <div
            className={
              selectedComponent === "dashboard" ? styles.activeBtn : ""
            }
            onClick={() => handleComponentChange("dashboard")}
          >
            Create URL
          </div>
          <div
            className={
              selectedComponent === "analytics" ? styles.activeBtn : ""
            }
            onClick={() => handleComponentChange("analytics")}
          >
            Dashboard
          </div>
        </div>
        <div className={styles.logout}>
          <div className={styles.line}></div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
      {selectedComponent === "dashboard" && <Dashboard />}
      {selectedComponent === "analytics" && (
        <Analytics onEditClick={() => handleComponentChange("dashboard")} />
      )}
    </div>
  );
}
