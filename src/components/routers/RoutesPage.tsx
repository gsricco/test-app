import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Path} from "../../enums/path";

const MainPage = React.lazy( () => import('../../pages/mainPage/MainPage') );
const Error404 = React.lazy( () => import('../../pages/error404/Error404'));


const RoutesPage = () => {

    const routes = [
        { path: Path.MAIN, component: <MainPage /> },
        { path: Path.ERROR_404, component: <Error404 /> },


    ];

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to={Path.MAIN} />} />
                {routes.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}
            </Routes>
        </div>
    );
};

export default RoutesPage;