import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import logo from "../../logo.svg";
import styles from "./Auth.module.css";

const Auth = () => {
    return (
        <main>
            <img className={styles.logo} src={logo} alt="Maxibot Logo" />
            <ToastContainer position="top-center" autoClose={8000}  />
            <div className={styles.container}>
            <Outlet styles="My Styles" />
            </div>
        </main>
    )
}

export default Auth