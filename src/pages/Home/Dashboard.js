import { Navigate } from "react-router-dom";
import SideNav from "../../components/SideNav";

import styles from "./Dashboard.module.css";

import profile__avatar from "../../assets/Icons/avatar.svg";
import search__icon from "../../assets/Icons/search.svg";

import filter__icon from "../../assets/Icons/filter.svg";

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
        <section className={styles.main__content}>
          <div className={styles.main__content__heading}>
            <h2>Running Bots</h2>
            <div className={styles.left__content}>
              <div className={styles.search__field}>
                <img
                  className={styles.search__icon}
                  src={search__icon}
                  alt="search icon"
                />
                <input
                  className={styles.search__input}
                  type="text"
                  placeholder="Search list"
                />
              </div>
              <img src={filter__icon} alt="filter icon" />
              <button className={styles.new__bot}>Add new</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
