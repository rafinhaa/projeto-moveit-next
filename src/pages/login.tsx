import Head from 'next/head';
import styles from "../styles/pages/Login.module.css";

export default function Login() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | Moveit</title>
            </Head>
            <header>Bem-vindo</header>
            <div className={styles.userName}>
                Digite seu username
            </div>

        </div>
    )    
}
