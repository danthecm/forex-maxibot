import styles from "./SideNav.module.css";

import logo from "../../logo.svg";
import logo__small from "../../logo__small.svg";

import dashboard__icon from "../../assets/Icons/dashboard.svg";
import profile__icon from "../../assets/Icons/profile.svg";
import security__icon from "../../assets/Icons/security.svg";
import help__icon from "../../assets/Icons/help.svg";
import exit__icon from "../../assets/Icons/exit.svg";

const SideNav = () => {
  return (
    <nav className={styles.sidenav}>
      <img className={styles.logo__large} src={logo} alt="Maxibot Logo" />
      <img className={styles.logo__small} src={logo__small} alt="Maxibot Logo" />
      <ul className={styles.nav__list}>
        <li className={styles.active}>
          <img src={dashboard__icon} alt="dashboard icon" />
          <span>Dashboard</span>
        </li>
        <li>
          <img src={profile__icon} alt="profile icon" />
          <span>Profile</span>
        </li>
        <li>
          <img src={security__icon} alt="security icon" />
          <span>Security</span>
        </li>
        <li>
          <img src={help__icon} alt="help icon" />
          <span>Help Guide</span>
        </li>
        <li>
          <img src={exit__icon} alt="exit icon" />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
