import React, {useEffect, useState} from 'react';
import styles from "./Favorites.module.scss";
import {Button, Input, Pagination, Paper} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getFavorite} from "../vacancy/vacancies-reducer";
import {IconSearch} from "@tabler/icons-react";
import ItemVacancies from "../jobSearch/itemsVacancies/ItemVacancies";

const Favorites = () => {
    const dispatch = useAppDispatch()
    const [numberPage, setNumberPage] = useState(1);
    const vacancies = useAppSelector(state => state.vacancies.vacancies.objects)

    const startIndex = (numberPage - 1) * 4;
    const endIndex = startIndex + 4;
    const allPages = Math.ceil(vacancies.length / 4)

    const setPage = (currentPage: number) => {
        setNumberPage(currentPage)
        console.log('currentPage', currentPage)
    }


    useEffect(()=>{
        dispatch(getFavorite())
    },[])


    return (
        <div className={styles.containerFavorites}>
            <div className={styles.contentJobSearch}>
                {
                    vacancies.slice(startIndex, endIndex).map((v, index) => {

                        return (
                            <ItemVacancies key={index} index={index} vac={v}/>
                        )
                    })
                }
                <div className={styles.pagination}>
                    <Pagination onChange={(e) => setPage(e)} total={allPages} siblings={1}
                                defaultValue={numberPage}/>
                </div>
            </div>
        </div>
    );
};

export default Favorites;