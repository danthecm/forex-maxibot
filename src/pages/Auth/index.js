import { Outlet } from "react-router-dom"
import logo from "../../logo.svg";
import styles from "./Auth.module.css";

const Auth = () => {
    return (
        <main>
            <img className={styles.logo} src={logo} alt="Maxibot Logo" />
            <div className={styles.container}>
            <Outlet />
            </div>
        </main>
    )
}

export default Auth