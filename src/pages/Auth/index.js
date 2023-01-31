import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { ReactComponent as Logo} from "../../logo.svg";
import styles from "./Auth.module.css";

const Auth = () => {
    return (
        <section className={styles.main}>
            <Logo className={styles.logo} />
            <main className={styles.container}>
            <Outlet styles="My Styles" />
            </main>
            <ToastContainer position="top-right" autoClose={4000}  />
        </section>
    )
}

export default Auth