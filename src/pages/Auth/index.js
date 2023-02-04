import { Outlet } from "react-router-dom"
import { ReactComponent as Logo} from "../../logo.svg";
import styles from "./Auth.module.css";

const Auth = () => {
    return (
        <section className={styles.main}>
            <Logo className={styles.logo} />
            <main className={styles.container}>
            <Outlet/>
            </main>

        </section>
    )
}

export default Auth