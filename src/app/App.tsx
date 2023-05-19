import React, {Suspense} from 'react';
import RoutesPage from "../components/routers/RoutesPage";
import Loading from "../components/loading/Loading";
import styles from './App.module.scss'
import HeaderJob from "../components/header/HeaderJob";


function App() {
    return (
        <div className={styles.containerApp}>
            <HeaderJob/>
            <Suspense fallback={<Loading/>}>
                <RoutesPage/>
            </Suspense>
        </div>
    );
}

export default App;
