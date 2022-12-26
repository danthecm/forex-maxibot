import { Navigate } from "react-router-dom";
import SideNav from "../../components/SideNav";

import styles from "./Dashboard.module.css";

import profile__avatar from "../../assets/Icons/avatar.svg";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.wrapper}>
      <SideNav />
      <main className={styles.main}>
        <section className={styles.header}>
          <div className={styles.profile__intro}>
            <img
              className={styles.profile__avatar}
              src={profile__avatar}
              alt="profile avatar"
            />
            <p className={styles.username}>
              {user.user.username.toUpperCase()}
            </p>
          </div>
          <h1>Welcome to TheMaxibot Forex</h1>
        </section>
        
      </main>
    </div>
  );
};

export default Dashboard;
