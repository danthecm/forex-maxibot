import { Navigate } from "react-router-dom";
import SideNav from "../../components/SideNav";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.wrapper}>
      <SideNav />
      <div>
        <h1>
          Hi {user.user.username ? user.user.username.toUpperCase() : "Dear"}
        </h1>
        <p>Welcome to the Maxibot Forex</p>
      </div>
    </div>
  );
};

export default Dashboard;
