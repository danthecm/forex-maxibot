import styles from "./SideNav.module.css";

import logo from "../../logo.svg";
import logo__small from "../../logo__small.svg";
import axios from "../../config/axios";

import dashboard__icon from "../../assets/Icons/dashboard.svg";
import profile__icon from "../../assets/Icons/profile.svg";
import security__icon from "../../assets/Icons/security.svg";
import help__icon from "../../assets/Icons/help.svg";
import exit__icon from "../../assets/Icons/exit.svg";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const LOGOUT_URL = "logout/";

const SideNav = () => {
  const logoutClickHandler = async () => {
    const loggingOut = toast.loading("Logging out...");
    try {
      const logoutReq = await axios.get(LOGOUT_URL, {
        withCredentials: true,
      });

      if (logoutReq.status !== 200) {
        throw new Error(logoutReq.status);
      }
      const data = await logoutReq.data;
      console.log("Logout request retuned", data);
      localStorage.removeItem("user");
      toast.update(loggingOut, {
        render: "Successfully logged out",
        type: "success",
        isLoading: false,
        closeButton: true,
      });
      window.location.reload(false);
    } catch (err) {
      console.log("Error logging out", err);
    }
  };
  return (
    <nav className={styles.sidenav}>
      <img className={styles.logo__large} src={logo} alt="Maxibot Logo" />
      <img
        className={styles.logo__small}
        src={logo__small}
        alt="Maxibot Logo"
      />
      <ul className={styles.nav__list}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
          >
            <img src={dashboard__icon} alt="dashboard icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/profile"
          >
            <img src={profile__icon} alt="profile icon" />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/security"
          >
            <img src={security__icon} alt="security icon" />
            <span>Security</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/help"
          >
            <img src={help__icon} alt="help icon" />
            <span>Help Guide</span>
          </NavLink>
        </li>
        <li onClick={logoutClickHandler}>
          <img src={exit__icon} alt="exit icon" />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
