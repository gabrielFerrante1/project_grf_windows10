import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Footer from './components/Layouts/Footer';
import Windows from './components/Window';
import { RootState } from './libs/redux/store';
import styles from './App.module.css'

export const App = () => {
    const so = useSelector((state: RootState) => state.so)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])
 
    return (
        <>
            <div className={styles.contentNoDesktop}>
                <h2>O sistema operacional só pode ser usado em um computador</h2>
            </div>

            <div className={styles.container}>
                {so.openApps.map((item, key) => (
                    <Windows
                        id={item}
                        key={key}
                    />
                ))}

                <div className={styles.app}>
                    <Home />
                </div>

                <Footer />

            </div>
        </>

    )
}

export default App;