import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { ReactComponent as Logo} from "../../logo.svg";
import styles from "./Auth.module.css";

const Auth = () => {
    return (
        <main className={styles.main}>
            <Logo className={styles.logo} />
            <div className={styles.container}>
            <Outlet styles="My Styles" />
            </div>
            <ToastContainer position="top-right" autoClose={5000}  />
        </main>
    )
}

export default Auth