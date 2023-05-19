import React, {useEffect, useState} from 'react';
import styles from "./Favorites.module.scss";
import {Pagination} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getFavorite} from "../vacancy/vacancies-reducer";
import ItemVacancies from "../jobSearch/itemsVacancies/ItemVacancies";
import noSearch from "../../assets/images/ClipNoSearch.svg";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Favorites = () => {
    const dispatch = useAppDispatch()
    const [numberPage, setNumberPage] = useState(1);
    const vacancies = useAppSelector(state => state.vacancies.vacancies.objects)
    const startIndex = (numberPage - 1) * 4;
    const endIndex = startIndex + 4;
    const allPages = Math.ceil(vacancies.length / 4)
    const isLoading = useAppSelector(state=>state.vacancies.isLoading)

    const setPage = (currentPage: number) => {
        setNumberPage(currentPage)
    }

    useEffect(() => {
        dispatch(getFavorite())
    }, [dispatch])

    return (
        <div className={styles.containerFavorites}>
            {isLoading && <Loading/>}
            {vacancies.length ? ( <div className={styles.contentJobSearch}>
                {
                    vacancies.slice(startIndex, endIndex).map((v, index) => (
                        <ItemVacancies key={index} index={index} vac={v}/>
                    ))
                }
                <div className={styles.pagination}>
                    <Pagination onChange={(e) => setPage(e)} total={allPages} siblings={1}
                                defaultValue={numberPage}/>
                </div>
            </div>)
                :(<div className={styles.noSearch}>
                        <img src={noSearch} alt="FFF"/>
                        <div>Упс, здесь еще ничего нет!</div>
                    </div>
                )}
        </div>
    );
};

export default Favorites;