import React from 'react';
import styles from './Error404.module.scss';
import page404 from "../../assets/images/404.svg";
import {Button} from "@mantine/core";
import {Link} from "react-router-dom";
import {Path} from "../../enums/path";

const Error404 = () => {
    return (
        <div className={styles.page404}>
            <img src={page404} alt="FFF"/>
            <div>Упс, такой страницы нет!</div>
            <Link to={Path.JOB_SEARCH}><Button className={styles.searchBack}>
                Поиск Вакансий
            </Button>
            </Link>
        </div>
    );
};

export default Error404;