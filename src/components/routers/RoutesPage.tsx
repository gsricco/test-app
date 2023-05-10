import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Path} from "../../enums/path";

const MainPage = React.lazy( () => import('../../pages/mainPage/MainPage') );
const Error404 = React.lazy( () => import('../../pages/error404/Error404'));
const Login = React.lazy( () => import('../../pages/login/Login'));
const JobSearch = React.lazy( () => import('../../pages/jobSearch/JobSearch'));
const Favorites = React.lazy( () => import('../../pages/favorites/Favorites'));
const Vacancy = React.lazy( () => import('../../pages/vacancy/Vacancy'));


const RoutesPage = () => {

    const routes = [
        { path: Path.MAIN, component: <MainPage /> },
        { path: Path.ERROR_404, component: <Error404 /> },
        { path: Path.LOGIN, component: <Login /> },
        { path: Path.JOB_SEARCH, component: <JobSearch /> },
        { path: Path.FAVORITES, component: <Favorites /> },
        { path: `${Path.VACANCY}/:id`, component: <Vacancy /> },


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