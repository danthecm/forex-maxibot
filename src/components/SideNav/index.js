import styles from "./SideNav.module.css";

import logo from "../../logo.svg";

import dashboard__icon from "../../assets/Icons/dashboard.svg";
import profile__icon from "../../assets/Icons/user.svg";
import security__icon from "../../assets/Icons/security.svg";
import help__icon from "../../assets/Icons/help.svg";
import exit__icon from "../../assets/Icons/exit.svg";

const SideNav = () => {
  return (
    <nav className={styles.sidenav}>
      <img src={logo} alt="Maxibot Logo" />
      <ul className={styles.nav__list}>
        <li className={styles.active}>
          <img src={dashboard__icon} alt="dashboard icon" />
          Dashboard
        </li>
        <li>
          <img src={profile__icon} alt="profile icon" />
          Profile
        </li>
        <li>
          <img src={security__icon} alt="security icon" />
          Security
        </li>
        <li>
          <img src={help__icon} alt="help icon" />
          Help Guide
        </li>
        <li>
          <img src={exit__icon} alt="exit icon" />
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
