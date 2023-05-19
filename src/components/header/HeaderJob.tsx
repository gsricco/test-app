import React from 'react';
import styles from './HeaderJob.module.scss'
import {Box} from '@mantine/core';
import logo from '../../assets/images/logoJob.svg'
import {NavLink} from "react-router-dom";
import {Path} from "../../enums/path";

const HeaderJob = () => {
    return (
        <div className={styles.containerHeader}>
            <Box className={styles.box}>
                <div className={styles.logo}>
                    <img src={logo} alt="Search job"/>
                    Jobored
                </div>
                <nav>
                    <div className={styles.itemMenuLink}>
                        <NavLink className={(navData) => navData.isActive ? styles.activeLink : styles.itemMenu}
                                 to={Path.JOB_SEARCH}>Поиск вакансий</NavLink>
                        <NavLink className={(navData) => navData.isActive ? styles.activeLink : styles.itemMenu}
                                 to={Path.FAVORITES}>Избранное</NavLink>
                    </div>
                </nav>
            </Box>
        </div>
    );
};

export default HeaderJob;